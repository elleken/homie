/**
 * $Id: config.js 37 2013-06-03 09:55:17Z akikar $ 
 * 
 * RequireJS file paths and shim config.
 *
 *
 * The build will inline common dependencies into this file.
 * File paths will be used for other module packages too, as defined in build.js.
 *
 *
 * More info            https://github.com/jrburke/r.js/blob/master/build/example.build.js
 *                      https://github.com/ryanfitzer/Example-RequireJS-jQuery-Project
 *                      https://github.com/tbranyen/backbone-boilerplate
 *                      https://github.com/requirejs/example-multipage-shim
 *
 * @author Aki Karkkainen - adapted from https://github.com/requirejs/example-multipage-shim
 * Twitter: http://twitter.com/akikoo
 *
 */

require.config({

	paths: {

		// Core libraries.
		jquery: '../lib/jquery/jquery',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone',
		graphite:   '../lib/graphite-lib/components/_base/js/graphite-core',

		// Templating.
		handlebars: '../lib/handlebars/handlebars',

		// Plugins.
		text : '../lib/requirejs-text/text',
        parse : '../js/vendors/parse.min',
        fastclick : '../lib/fastclick/lib/fastclick',
		triggerPath: '../js/vendors/jquery.triggerpath',
		moment: '../lib/moment/moment',

		// Graphite
		graphite_storage : '../lib/graphite-lib/components/_base/js/graphite-storage',
		graphite_pubsub : '../lib/graphite-lib/components/_base/js/graphite-pubsub',

		graphite_utilities : '../lib/graphite-lib/components/_base/js/graphite-utilities',
		graphite_responsive : '../lib/graphite-lib/components/_base/js/graphite-responsive',
		graphite_cookie : '../lib/graphite-lib/components/_base/js/graphite-cookie',

		//components
		chartjs: '../homie-lib/components/c_chart/Chart',
		c_chart: '../homie-lib/components/c_chart/c_chart'



	},

	// Dependancies for modules that are not wrapped as AMD modules.
	shim: {
   		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		underscore: {
			exports: '_'
		},
		handlebars: {
			exports: 'Handlebars'
		}
	}
});
