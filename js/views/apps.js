/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/apps.html',
    'collections/apps',
    'views/app'
], function ($, _, Backbone, appsTemplate, appsCollection, appView) {
	'use strict';

	var AppsView = Backbone.View.extend({

        el: $('#container'),

		template: _.template(appsTemplate),

		// The DOM events specific to an item.
		events: {

		},

        initialize: function() {
            var me = this;
            appsCollection.fetch({
                success: function(model, response, options) {
                    me.apps = response;
                    me.model = model;
                    me.render();
                }
            });

        },

		// Re-render the titles of the todo item.
		render: function () {
            var me = this;
            _.each(this.apps, function (app) {
                $(this.el).append(new appView({model:app}).render().el);
            }, this);

			//this.$el.html(this.template(this.apps));

			return this;
		}
    });

	return AppsView;
});
