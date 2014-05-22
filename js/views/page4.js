define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/page4.html',
    'views/base'

], function ($, _, Backbone, appsTemplate, BaseView) {
    'use strict';

    var Page4View = BaseView.extend({

        el: $('#workspace'),

        template: _.template(appsTemplate),

        // The DOM events specific to an item.
        events: {

        },

        super: function(methodName, args) {
            BaseView.prototype[methodName].apply(this, args);
        },

        initialize: function (options) {
            this.super("initialize",[options]);

        },

        render: function (options) {
            this.super("render",[options]);


            return this;
        },

        transitionIn: function (writecallback, callback) {

            this.super("transitionIn",[writecallback, callback]);

        },

        transitionOut: function (writecallback, callback) {

            this.super("transitionOut",[writecallback, callback]);

        }

    });

    return Page4View;
});
