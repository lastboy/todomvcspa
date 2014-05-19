/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var App = Backbone.Model.extend({
        initialize: function () {
            console.log("[hp4m app model] Initialized");
        }
	});

	return App;
});
