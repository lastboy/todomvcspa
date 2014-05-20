/*global define*/
define([
    'jquery',
    'backbone',
    'models/navbar',
    'views/navbar'

], function ($, Backbone, Navbar, NavbarView) {
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
            console.log("[hp4m router] Initialized");
            this.refs.navbarModel = new Navbar();
            new NavbarView({model: this.refs.navbarModel});

        },

        home: function () {
            console.log("[hp4m router] Home call");
            this.page("1");
        },

        page: function(id) {
            var refId,
                viewName,
                me = this;

            function _pageSize() {
                var key, counter=0;
                for (key in me.pages) {
                    counter++;
                }
            }

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
                    this.refs[refId] = require([viewName], function() {
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
