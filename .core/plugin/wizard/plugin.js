const PLUGIN = require('./meta');
const { ensureContentType } = require('./content-type');

Actinium.Plugin.register(PLUGIN, true);

/**
 * ----------------------------------------------------------------------------
 * Hooks
 * ----------------------------------------------------------------------------
 */

// content-schema-field-types hook
Actinium.Hook.register('content-schema-field-types', async fieldTypes => {
    if (!Actinium.Plugin.isActive(PLUGIN.ID)) return;
    fieldTypes['Wizard'] = { type: 'Array' };
});

// content-type
Actinium.Hook.register('activate', ensureContentType);
Actinium.Hook.register('install', ensureContentType);
Actinium.Hook.register('update', ensureContentType);
