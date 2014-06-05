define([
    'jquery',
    'underscore',
    'backbone'

], function ($, _, Backbone) {
    'use strict';

    var BaseView = Backbone.View.extend({

        config: function (id) {
            var page = "page" + id,
                me = this,
                pageconfig;

            me.options.pages = {

                page1: {
                    delay: 400,
                    top: 50,
                    topin: 500,
                    topout: 500
                },
                page2: {
                    delay: 400,
                    top: 50,
                    topin: 500,
                    topout: 500
                }
            };

            pageconfig = me.options.pages[page];
            if (!pageconfig) {
                pageconfig = me.options.pages["page" + 2];
            }
            return pageconfig;
        },

        initialize: function (options) {
            var me = this;
            me.options = (options || {});
            me.options.self = me.config(me.options.id);
        },

        render: function (options) {
            var me = this,
                callback = options.callback;

            function _transitionCallback() {
               me.cleanup();

                me.$el.html(me.template({counter: me.options.id}));
            }

            me.options.status = options.status;
            me.options.direction = options.direction;

            if (!me.options.status) {
                this.transitionIn(_transitionCallback, callback);
            } else {
                this.transitionOut(_transitionCallback, callback);
            }


            return this;
        },

        cleanup: function() {
            var me = this,
                page = me.$el.find("#page");

            if (page) {
                page.remove();
                page.unbind();
            }
            $(this.el).empty();
            $(this.el).unbind();
        },

        transitionIn: function (writecallback, callback) {

            var top,
                me = this,
                topin,
                mopt = me.options.self;

            this.$el.css("opacity", "0");

            if (writecallback) {
                writecallback.call(this);
            }

            topin = (me.options.direction === 0 ? ((-1) * (mopt.topin)) : mopt.topin);
            this.$el.css("top", topin);
            this.$el.css("opacity", "1");

            top = mopt.top;
            this.$el.animate({
                top: top

            }, mopt.delay, function () {
                // Animation complete.
                if (callback) {
                    callback.call(me);
                }
            });
        },

        transitionOut: function (writecallback, callback) {

            var top,
                me = this,
                mopt = me.options.self;


            if (writecallback) {
                writecallback.call(this);
            }

            top = (me.options.direction === 1 ? ((-1) * (mopt.topout)) : mopt.topout);

            this.$el.animate({
                top: top

            }, mopt.delay, function () {
                // Animation complete.
                if (callback) {
                    callback.call(me);
                }
            });

        }

    });

    return BaseView;
});
