define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/mobile.html',
    'views/base'

], function ($, _, Backbone, mobileTemplate) {
    'use strict';

    var MobileView =  Backbone.View.extend({

        el: $('#workspace'),

        template: _.template(mobileTemplate),

        // The DOM events specific to an item.
        events: {

        },

        initialize: function () {
            this.render();

        },

        render: function () {

            this.$el.html(this.template({}));
            return this;
        }

    });

    return MobileView;
});
