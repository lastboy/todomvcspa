/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/page1.html'

], function ($, _, Backbone, appsTemplate) {
    'use strict';

    var AppsView = Backbone.View.extend({

        el: $('#workspace'),

        template: _.template(appsTemplate),

        // The DOM events specific to an item.
        events: {

        },

        initialize: function() {
            var me = this;
            this.render();

        },

        // Re-render the titles of the todo item.
        render: function () {
            var me = this;

            this.$el.html(this.template());
            return this;
        }
    });

    return AppsView;
});
