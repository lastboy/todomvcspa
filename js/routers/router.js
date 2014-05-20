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
                            me.page(id-1);
                        }
                    } else {
                        if ((id+1) <= pageSize) {
                            me.page(id+1);
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
            this.page("1");
        },

        page: function (id) {
            var refId,
                viewName,
                me = this;

            function _callback(obj) {
                me.refs.navbarModel.set(obj);
            }

            console.log("[hp4m page] moving to page: ", id);

            // Initialize the application view
            if (id) {

                refId = "p" + id;
                viewName = "views/page" + id;

                if (!this.refs[refId]) {
                    // load the view module
                    this.refs[refId] = require([viewName], function () {
                        var args = arguments,
                            view = args[0];
                        me.pages[id] = new view();

                        _callback({id: id});

                    });

                } else {

                    if (!me.pages[id]) {
                        // instantiate the view
                        me.pages[id] = new this.refs[refId]();

                    } else {
                        // render the view
                        me.pages[id].render();
                    }

                    _callback({id: id});
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
