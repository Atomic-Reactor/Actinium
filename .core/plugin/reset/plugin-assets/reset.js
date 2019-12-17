!(function(e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t(
              require('reactium-core/sdk'),
              require('react'),
              require('@atomic-reactor/reactium-ui'),
              require('object-path'),
          ))
        : 'function' == typeof define && define.amd
        ? define([
              'reactium-core/sdk',
              'react',
              '@atomic-reactor/reactium-ui',
              'object-path',
          ], t)
        : 'object' == typeof exports
        ? (exports.reset = t(
              require('reactium-core/sdk'),
              require('react'),
              require('@atomic-reactor/reactium-ui'),
              require('object-path'),
          ))
        : (e.reset = t(
              e['reactium-core/sdk'],
              e.react,
              e['@atomic-reactor/reactium-ui'],
              e['object-path'],
          ));
})(window, function(e, t, r, n) {
    return (function(e) {
        var t = {};
        function r(n) {
            if (t[n]) return t[n].exports;
            var o = (t[n] = { i: n, l: !1, exports: {} });
            return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
        }
        return (
            (r.m = e),
            (r.c = t),
            (r.d = function(e, t, n) {
                r.o(e, t) ||
                    Object.defineProperty(e, t, { enumerable: !0, get: n });
            }),
            (r.r = function(e) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: 'Module',
                    }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            }),
            (r.t = function(e, t) {
                if ((1 & t && (e = r(e)), 8 & t)) return e;
                if (4 & t && 'object' == typeof e && e && e.__esModule)
                    return e;
                var n = Object.create(null);
                if (
                    (r.r(n),
                    Object.defineProperty(n, 'default', {
                        enumerable: !0,
                        value: e,
                    }),
                    2 & t && 'string' != typeof e)
                )
                    for (var o in e)
                        r.d(
                            n,
                            o,
                            function(t) {
                                return e[t];
                            }.bind(null, o),
                        );
                return n;
            }),
            (r.n = function(e) {
                var t =
                    e && e.__esModule
                        ? function() {
                              return e.default;
                          }
                        : function() {
                              return e;
                          };
                return r.d(t, 'a', t), t;
            }),
            (r.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.p = ''),
            r((r.s = 4))
        );
    })([
        function(t, r) {
            t.exports = e;
        },
        function(e, r) {
            e.exports = t;
        },
        function(e, t) {
            e.exports = r;
        },
        function(e, t) {
            e.exports = n;
        },
        function(e, t, r) {
            r(5);
        },
        function(e, t, r) {
            'use strict';
            r.r(t);
            var n = r(0),
                o = r.n(n),
                i = r(1),
                c = r.n(i),
                u = r(2),
                a = r(3),
                s = r.n(a),
                l = function(e) {
                    var t = Object(n.useHandle)('AdminTools'),
                        r = s.a.get(t, 'Modal'),
                        i = s.a.get(t, 'Toast'),
                        a = Object(n.useHookComponent)('ConfirmBox'),
                        l = Object(n.__)('Actinium Reset'),
                        f = { header: { title: l }, dismissable: !1 },
                        m = function() {
                            return regeneratorRuntime.async(
                                function(e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (
                                                    (e.prev = 0),
                                                    (e.next = 3),
                                                    regeneratorRuntime.awrap(
                                                        o.a.Cloud.run(
                                                            'reset-actinium',
                                                        ),
                                                    )
                                                );
                                            case 3:
                                                i.show({
                                                    type: i.TYPE.SUCCESS,
                                                    message: Object(n.__)(
                                                        'Success! You should restart Actinium.',
                                                    ),
                                                    icon: c.a.createElement(
                                                        u.Icon.Feather.Check,
                                                        {
                                                            style: {
                                                                marginRight: 12,
                                                            },
                                                        },
                                                    ),
                                                }),
                                                    (e.next = 10);
                                                break;
                                            case 6:
                                                (e.prev = 6),
                                                    (e.t0 = e.catch(0)),
                                                    i.show({
                                                        type: i.TYPE.ERROR,
                                                        message: Object(n.__)(
                                                            'Error resetting actinium!',
                                                        ),
                                                        icon: c.a.createElement(
                                                            u.Icon.Feather
                                                                .AlertOctagon,
                                                            {
                                                                style: {
                                                                    marginRight: 12,
                                                                },
                                                            },
                                                        ),
                                                    }),
                                                    console.error(e.t0);
                                            case 10:
                                                r.dismiss();
                                            case 11:
                                            case 'end':
                                                return e.stop();
                                        }
                                },
                                null,
                                null,
                                [[0, 6]],
                            );
                        };
                    return c.a.createElement(
                        u.Dialog,
                        f,
                        c.a.createElement(
                            'div',
                            { className: 'plugin-settings-reset' },
                            c.a.createElement(
                                u.Button,
                                {
                                    color: u.Button.ENUMS.COLOR.DANGER,
                                    size: u.Button.ENUMS.SIZE.LG,
                                    onClick: function() {
                                        return r.show(
                                            c.a.createElement(a, {
                                                message: Object(n.__)(
                                                    'Are you sure? This is a destructive operation.',
                                                ),
                                                onCancel: function() {
                                                    return r.hide();
                                                },
                                                onConfirm: m,
                                                title: l,
                                            }),
                                        );
                                    },
                                },
                                Object(n.__)('Reset Actinium'),
                            ),
                        ),
                    );
                };
            regeneratorRuntime.async(function(e) {
                for (;;)
                    switch ((e.prev = e.next)) {
                        case 0:
                            return (
                                (e.next = 2),
                                regeneratorRuntime.awrap(
                                    o.a.Plugin.register('reset-plugin'),
                                )
                            );
                        case 2:
                            o.a.Zone.addComponent({
                                id: 'RESET-PLUGIN-SETTINGS',
                                zone: 'plugin-settings-Reset',
                                component: l,
                                order: 0,
                            });
                        case 3:
                        case 'end':
                            return e.stop();
                    }
            });
        },
    ]);
});
