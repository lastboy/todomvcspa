/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/page2.html',
    'views/base'

], function ($, _, Backbone, appsTemplate, BaseView) {
    'use strict';

    var Page2View = BaseView.extend({

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

            var top = 20,
                techs = ["backbone", "jquery", "underscorejs", "requirejs", "lesscss", "jquery.mousewheel", "lesshat"],
                techelt = $(this.$el).find("#techs");


            techs.forEach(function(tech) {
                techelt.append("<div class='standout'>" + tech + "</div>");

            });


            techelt.children().each(function() {
                $(this).animate({
                    top: top,
                    left: 20,
                    opacity: 1,
                    paddingLeft: 40

                }, 1000, function () {
                    // Animation complete.

                });
                top += 40;
            });


            return this;
        },

        transitionIn: function (writecallback, callback) {

            this.super("transitionIn",[writecallback, callback]);

        },

        transitionOut: function (writecallback, callback) {

            this.super("transitionOut",[writecallback, callback]);

        }

    });

    return Page2View;
});
