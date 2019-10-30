const middleware = [];
const path = require('path');
const op = require('object-path');
const express = require('express');

// if (!op.get(ENV, 'NO_DOCS', false)) {
//     // Create the router
//     const router = express.Router();
//
//     // /docs route and static served content
//     const dir = path.join(BASE_DIR, 'docs');
//     router.use('/docs', express.static(dir));
//
//     // Add to middleware array
//     middleware.push(router);
// }
//
// module.exports = {
//     order: 0,
//     middleware,
// };

Actinium.Middleware.register('docs', app => {
    if (!op.get(ENV, 'NO_DOCS', false)) {
        // Create the router
        const router = express.Router();

        // /docs route and static served content
        const dir = path.join(BASE_DIR, 'docs');
        router.use('/docs', express.static(dir));

        app.use(router);
    }

    return Promise.resolve();
});
