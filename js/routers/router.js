/*global define*/
define([
    'jquery',
    'backbone',
    'views/page1',
    'views/page2'

], function ($, Backbone, Page1View, Page2View) {
    'use strict';

    var hp4mRouter = Backbone.Router.extend({

        routes: {
            "": "home",
            "page/:id": "page",
            "apps/": "apps"
        },

        pages: [],
        refs: {
           p1: Page1View,
           p2: Page2View
        },

        initialize: function () {
            console.log("[hp4m router] Initialized");
        },

        home: function () {
            console.log("[hp4m router] Home call");

            // Initialize the application view
            this.page1View = new Page1View();
        },

        page: function(id) {
            console.log("[hp4m page] moving to page: ", id);
            if (id) {
                this.pages[id] = new this.refs["p"+id]();
            }
        },

        apps: function () {
            console.log("[hp4m router] Apps call");
            this.$el.empty();
        }
    });

    return hp4mRouter;
});
