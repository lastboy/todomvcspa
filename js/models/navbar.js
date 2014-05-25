/*global define*/
define([
	'underscore',
	'backbone',
    'backboneLocalstorage'

], function (_, Backbone, Store) {
	'use strict';

	var Navbar = Backbone.Model.extend({

        // Save all of the items under the "navbar" namespace.
        localStorage: new Store('navbar-backbone'),

        initialize: function () {
            console.log("[todomvcspa app model] Initialized");
        }
	});

	return Navbar;
});
