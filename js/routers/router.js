define([
    'jquery',
    'backbone',
    'routers/uirouter',
    'models/navbar',
    'views/navbar',
    'views/mobile',
    'utils/device'

], function ($, Backbone, keyrouter, Navbar, NavbarView, MobileView, device) {
    'use strict';

    var todomvcspa = Backbone.Router.extend({

        routes: {
            "": "home",
            "mobile": "mobile",
            "page/:id": "page",
            "page/:id/:direction": "page",
            "apps/": "apps"
        },

        pages: {},
        refs: {
        },

        initialize: function () {
            var me = this;
            console.log("[todomvcspa router] Initialized");

            if (!device.isDevice()) {

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
                                //me.page(id - 1, 0);
                                me.navigate("page/" + (id - 1) + "/0", true);
                            }
                        } else {
                            if ((id + 1) <= pageSize) {
                                //me.page(id + 1, 1);
                                me.navigate("page/" + (id + 1) + "/1", true);
                            }
                        }
                    }
                };
                keyrouter.init(me.uiroutercallback);
            }
        },

        mobile: function () {

            var mobileView = new MobileView();


        },

        pagesSize: function () {
            return this.refs.navbarModel.get("counter");
        },

        home: function () {
            console.log("[todomvcspa router] Home call");

            if (!device.isDevice()) {
                this.navigate("page/1", true);
            } else {
                this.navigate("mobile", true);
            }
        },

        page: function (id, direction) {
            var refId,
                viewName,
                me = this;

            direction = (direction ? parseInt(direction) : 0 );

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

                    me.pages[me.pages.previous].render({id: me.pages.previous, direction: direction, status: 1, callback: function () {

                        me.pages[id].render({d: id, direction: direction, status: 0});

                    }});


                } else {

                    me.pages[id].render({id: id, direction: direction, status: 0});
                }


                _callback({id: id});

            }

            console.log("[todomvcspa page] moving to page: ", id);

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
            console.log("[todomvcspa router] Apps call");
            this.$el.empty();
        }
    });

    return todomvcspa;
});
