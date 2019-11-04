const op = require('object-path');
const ActionSequence = require('action-sequence');
const chalk = require('chalk');

const collectionPerms = {};
const collectionSchema = {};

const defaultPublicSetting = {
    create: false,
    retrieve: false,
    update: false,
    delete: false,
    addField: false,
};

const Collection = {};
Collection.register = (
    collection,
    publicSetting = defaultPublicSetting,
    schema,
) => {
    if (schema) {
        collectionSchema[collection] = schema;
    }

    collectionPerms[collection] = publicSetting;

    if (Actinium.started === true) {
        Collection.load(collection);
    }
};

Collection.unregister = collection => {
    if (collection in collectionPerms) {
        // default to private permissions
        collectionPerms[collection] = defaultPublicSetting;

        if (Actinium.started === true) {
            Collection.load(collection);
        }
    }
};

Collection.load = async (collection = false) => {
    let entries = [];
    if (collection && collection in collectionPerms) {
        entries.push([collection, collectionPerms[collection]]);
    } else {
        entries = Object.entries(collectionPerms);
    }

    const actions = entries.reduce((actions, [collection, publicSetting]) => {
        actions[`${collection}Hook`] = () =>
            Actinium.Hook.run(
                'collection-before-permissions',
                collection,
                publicSetting,
            );
        actions[collection] = async () => {
            const ParseSchema = new Parse.Schema(collection);
            const schemaController = Parse.CoreManager.getSchemaController();
            let schema;
            try {
                schema = await ParseSchema.get({
                    useMasterKey: true,
                });
            } catch (error) {
                schema = {};
            }

            const {
                createPermission,
                retrievePermission,
                updatePermission,
                deletePermission,
                addFieldPermission,
            } = ['create', 'retrieve', 'update', 'delete', 'addField'].reduce(
                (classLevelPermissions, capability) => {
                    const permLabel = `${capability}Permission`;
                    classLevelPermissions[permLabel] = op.get(
                        publicSetting,
                        capability,
                        false,
                    )
                        ? { '*': true }
                        : {};

                    Actinium.Capability.roles(
                        `${collection}.${capability}`,
                    ).forEach(role =>
                        op.set(
                            classLevelPermissions,
                            [permLabel, `role:${role}`],
                            true,
                        ),
                    );

                    op.set(
                        classLevelPermissions,
                        [permLabel, 'role:administrator'],
                        true,
                    );
                    op.set(
                        classLevelPermissions,
                        [permLabel, 'role:super-admin'],
                        true,
                    );

                    return classLevelPermissions;
                },
                {},
            );

            op.set(schema, 'classLevelPermissions.find', retrievePermission);
            op.set(schema, 'classLevelPermissions.count', retrievePermission);
            op.set(schema, 'classLevelPermissions.get', retrievePermission);
            op.set(schema, 'classLevelPermissions.create', createPermission);
            op.set(schema, 'classLevelPermissions.update', updatePermission);
            op.set(schema, 'classLevelPermissions.delete', deletePermission);
            op.set(
                schema,
                'classLevelPermissions.addField',
                addFieldPermission,
            );

            const { className, classLevelPermissions } = schema;

            const fields = op.has(collectionSchema, collection)
                ? collectionSchema[collection]
                : {};

            Object.keys(fields).forEach(field => {
                const del = op.get(fields, [field, 'delete']) === true;

                if (del === true) {
                    op.set(fields, [field, '__op'], 'Delete');
                    op.del(fields, [field, 'delete']);
                }

                const hasField = op.get(schema, ['fields', field], false);

                if (hasField && del) {
                    return;
                }

                if ((!hasField && del) || hasField) {
                    op.del(fields, field);
                }
            });

            // Update Schema
            if (className) {
                return schemaController.update(
                    collection,
                    {
                        className: collection,
                        classLevelPermissions,
                        fields,
                    },
                    { useMasterKey: true },
                );
            }

            // Create Schema
            return schemaController.create(
                collection,
                {
                    className: collection,
                    classLevelPermissions,
                    fields,
                },
                { useMasterKey: true },
            );
        };

        return actions;
    }, {});

    try {
        const results = await ActionSequence({
            actions,
        });
        return results;
    } catch (error) {
        LOG(
            chalk.cyan('Error'),
            chalk.magenta('loading class level permissions'),
            error,
        );
    }
    return Promise.resolve();
};

module.exports = Collection;
