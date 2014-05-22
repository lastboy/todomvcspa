define([
    'jquery',
    'backbone',
    'routers/uirouter',
    'models/navbar',
    'views/navbar'

], function ($, Backbone, keyrouter, Navbar, NavbarView) {
    'use strict';

    var hp4mRouter = Backbone.Router.extend({

        routes: {
            "": "home",
            "page/:id": "page",
            "apps/": "apps"
        },

        pages: {},
        refs: {
        },

        initialize: function () {
            var me = this;
            console.log("[hp4m router] Initialized");

            // Navigation bar
            this.refs.navbarModel = new Navbar();
            new NavbarView({model: this.refs.navbarModel});

            // key router
            me.uiroutercallback = function (gap) {
                var id = me.refs.navbarModel.get("id"),
                    pageSize = parseInt(me.pagesSize());

                if (id) {
                    id = parseInt(id);
                    if (gap === -1) {
                        if (id > 1) {
                            me.page(id - 1, 0);
                        }
                    } else {
                        if ((id + 1) <= pageSize) {
                            me.page(id + 1, 1);
                        }
                    }
                }
            };
            keyrouter.init(me.uiroutercallback);

        },

        pagesSize: function () {
            return this.refs.navbarModel.get("counter");
        },

        home: function () {
            console.log("[hp4m router] Home call");
            this.page("1", 1);
        },

        page: function (id, direction) {
            var refId,
                viewName,
                me = this;

            function _callback(obj) {
                me.refs.navbarModel.set(obj);
            }

            function _processView(id, view) {

                view = (view || me.refs[refId]);
                if (!me.pages[id]) {
                    // instantiate the view
                    me.pages[id] = new view({id: id});

                }

                // render the view
                if (parseInt(me.pages.previous) !== parseInt(me.pages.current)) {

                    me.pages[me.pages.previous].render({id:me.pages.previous, direction: direction, status: 1, callback: function () {

                        me.pages[id].render({d: id, direction: direction, status: 0});

                    }});


                } else {

                    me.pages[id].render({id:id, direction: direction, status: 0});
                }


                _callback({id: id});

            }

            console.log("[hp4m page] moving to page: ", id);

            // Initialize the application view
            if (id) {

                console.log("page direction: ", direction);
                me.pages.previous = (me.pages.current || id);
                me.pages.current = (id || 1);

                refId = "p" + id;
                viewName = "views/page" + id;

                if (!me.refs[refId]) {
                    // load the view module
                    me.refs[refId] = require([viewName], function () {
                        var args = arguments,
                            view = args[0];

                        _processView(id, view);

                    });

                } else {

                    _processView(id);
                }


            }
        },

        apps: function () {
            console.log("[hp4m router] Apps call");
            this.$el.empty();
        }
    });

    return hp4mRouter;
});
