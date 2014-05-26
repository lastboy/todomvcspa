/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
        "jquery.mousewheel":{
            deps: [
                'jquery'
            ]
        },
		backbone: {
			deps: [
				'underscore',
				'jquery',
                "jquery.mousewheel"
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		"jquery": '../bower_components/jquery/jquery',
        "jquery.mousewheel": '../bower_components/jquery-mousewheel/jquery.mousewheel',
		"underscore": '../bower_components/underscore/underscore',
		"backbone": '../bower_components/backbone/backbone',
		"backboneLocalstorage": '../bower_components/backbone.localStorage/backbone.localStorage',
		"text": '../bower_components/requirejs-text/text'
	}
});

require([
	'backbone',
    'routers/router'

], function (Backbone, Workspace) {

    console.log("[todomvcspa require] initialized");
	/*jshint nonew:false*/

	// Initialize routing and start Backbone.history()
    new Workspace();

    Backbone.history.start();

});
