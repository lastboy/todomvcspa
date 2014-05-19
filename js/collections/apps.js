/*global define*/
define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/app'
], function (_, Backbone, Store, App) {
	'use strict';

	var AppsCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: App,

        initialize: function () {
            console.log("[hp4m app collection] Initialized");
        },

        url: "data/apps.json"



    });

	return new AppsCollection();
});
