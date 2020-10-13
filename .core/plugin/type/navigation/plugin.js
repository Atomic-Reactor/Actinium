const chalk = require('chalk');
const op = require('object-path');
const { CloudRunOptions } = require(`${ACTINIUM_DIR}/lib/utils`);
const uuid = require('uuid/v4');

const PLUGIN = {
    ID: 'Navigation',
    description: 'Add navigation content type.',
    name: 'Navigation Plugin',
    order: 100,
    version: {
        actinium: '>=3.2.6',
        plugin: '1.0.0',
    },
    bundle: [],
    meta: {
        builtIn: true,
    },
};

/**
 * ----------------------------------------------------------------------------
 * Plugin registration
 * ----------------------------------------------------------------------------
 */
Actinium.Plugin.register(PLUGIN, true);

/**
 * ----------------------------------------------------------------------------
 * Hook registration
 * ----------------------------------------------------------------------------
 */

Actinium.Hook.register('warning', () => {
    if (!Actinium.Plugin.isActive(PLUGIN.ID)) return;
    // Your bootstrap warning messages here
    // WARN('');
    // WARN(chalk.cyan.bold('Warning:'), 'about something');
});

const ensureNavigationType = async ({ ID }) => {
    if (ID !== PLUGIN.ID) return;

    INFO('Ensuring Navigation content type.');

    const options = Actinium.Utils.MasterOptions();
    // let collection;
    // try {
    //     const type = await Actinium.Type.retrieve(
    //         { machineName: 'test_content' },
    //         options,
    //     );
    //     const typeObj = new Actinium.Object('Type');
    //     typeObj.id = type.objectId;
    //     typeObj.fetch(options);
    //     typeObj.set('slugs', []);
    //     typeObj.save(null, options);
    //
    //     collection = type.collection;
    // } catch (error) {}

    const navigationTypeTemplate = {
        type: 'Navigation',
        machineName: 'navigation',
        fields: {
            navigation_menu_builder: {
                fieldName: 'Menu Builder',
                helpText: 'Build your navigation menu.',
                fieldId: 'navigation_menu_builder',
                fieldType: 'MenuBuilder',
                region: 'default',
            },
            navigation_content: {
                fieldName: 'Navigation Content',
                label: null,
                placeholder: null,
                helpText: 'Add additional content along with this navigation.',
                fieldId: 'navigation_content',
                fieldType: 'RichText',
                region: 'default',
            },
            publisher: {
                fieldName: 'Publish',
                statuses: 'DRAFT,PUBLISHED',
                simple: true,
                fieldId: 'publisher',
                fieldType: 'Publisher',
                region: 'sidebar',
            },
        },
        regions: {
            default: {
                id: 'default',
                label: 'Default',
                slug: 'default',
                order: -1000,
            },
            sidebar: {
                id: 'sidebar',
                label: 'Sidebar',
                slug: 'sidebar',
                order: 1000,
            },
        },
        meta: {
            label: 'Navigation',
            icon: 'Linear.Menu3',
        },
    };

    let navigation;
    try {
        navigation = await Actinium.Type.retrieve(
            { machineName: 'navigation' },
            options,
        );
    } catch (error) {}

    if (!navigation) {
        navigation = await Actinium.Type.create(
            navigationTypeTemplate,
            options,
        );
    } else {
        const updatedNavigationType = {
            ...navigation,
        };

        // ensure navigation base fields exist
        op.set(updatedNavigationType, 'fields', {
            ...navigation.fields,
            ...navigationTypeTemplate.fields,
        });

        navigation = await Actinium.Type.update(updatedNavigationType, options);
    }
};

Actinium.Hook.register('activate', ensureNavigationType);
Actinium.Hook.register('install', ensureNavigationType);
Actinium.Hook.register('update', ensureNavigationType);

Actinium.Hook.register('uninstall', async ({ ID }) => {
    if (ID !== PLUGIN.ID) return;
});