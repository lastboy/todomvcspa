/*global define*/
define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var AppView = Backbone.View.extend({

		template: _.template("<div><%= name %></div>"),

		// The DOM events specific to an item.
		events: {

		},

        initialize: function() {

            this.render();


        },

		// Re-render the titles of the todo item.
		render: function () {

            $(this.el).html(this.template(this.model));
			return this;
		}
    });

	return AppView;
});
