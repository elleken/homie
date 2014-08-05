
// Grunt configuration wrapper function.
module.exports = function (grunt) {

	'use strict';

	// Configurable paths and other variables.
	var config = {
		iconFolder: 'icons'
	};

	// Initialize our configuration object.
	grunt.initConfig({

		/*
		 * Get config options.
		 */
		config: config,


		/*
		 * Get the project metadata.
		 */
		pkg: grunt.file.readJSON('package.json'),


		/*
		 * Create a dynamic build header.
		 */
		banner: '/*! <%= pkg.name %> v<%= pkg.version %> | ' +
			'<%= grunt.template.today("dd-mm-yyyy-hh:MM:ss") %>\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> |' +
			' Licensed <%= pkg.license %>\n */\n',


		/*
		 * A mystical CSS icon solution.
		 * See http://filamentgroup.com/lab/grunticon/.
		 */
		grunticon: {
			makeicons: {
				files:[{
					// expand css
					expand: true,
					// gewt files from
					cwd: '<%= config.iconFolder %>/svg/sprite',
					// wich files to get.
					src: ['*.svg', '*.png'],
					// where to put css
					dest: '<%= config.iconFolder %>/output/css/'
				}],
				options: {


					// CSS filenames.
					datasvgcss: 'icons-data-svg.css',
					datapngcss: 'icons-data-png.css',
					urlpngcss: 'icons-fallback.css',

					// Preview HTML filename.
					previewhtml: '../html/icons-grunticon.html',

					// Grunticon loader code snippet filename.
					loadersnippet: '../html/icons-loader.html',

					// Folder name (within dest) for png output.
					pngfolder: '../png/',

					// Prefix for CSS classnames.
					cssprefix: 'c_icon-',
					// custom template for creating css.
					template: '<%= config.iconFolder %>/templates/grunticon-css-template.hbs'

				}
			}
		},

		/*
		 * Create icons-font from svg's.
		 * See more at https://github.com/sapegin/grunt-webfont.
		 */
		webfont: {
			icons: {
				// where to get the svg's from
				src: '<%= config.iconFolder %>/svg/font/*.svg',
				// where to put the fonts
				dest: '<%= config.iconFolder %>/output/fonts',
				// where to put the css
				destCss: '<%= config.iconFolder %>/output/css',
				options: {
					// wich font-engine do we use (node cause it's already installed)
					engine: 'node',
					// css class-prefix
					font: 'icons-font',
					// type of stylesheet generated
					stylesheet: 'css',
					// where to put an example html.
					destHtml: '<%= config.iconFolder %>/output/html/',
					// path to custom css.file template.
					template: '<%= config.iconFolder %>/templates/webfont-css-template.css'
					// support ie7 ?
//                    ie7: true
				}
			}
		},


	});


	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-webfont');

	// The icons generator would be run by typing "grunt icons" on the command line.
	grunt.registerTask('makeicons', [
		'grunticon',
		'webfont'
	]);

};