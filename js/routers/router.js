/*global define*/
define([
    'jquery',
    'backbone',
    'views/index'
], function ($, Backbone, IndexView) {
    'use strict';

    var hp4mRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "apps/": "apps"
        },

        initialize: function () {
            console.log("[hp4m router] Initialized");
        },

        home: function () {
            console.log("[hp4m router] Home call");

            // Initialize the application view
            this.indexView = new IndexView();
        },

        apps: function () {
            console.log("[hp4m router] Apps call");
            this.$el.empty();
        }
    });

    return hp4mRouter;
});
