/*
 * $Id: Gruntfile.js 36 2013-06-03 09:03:48Z akikar $ 
 * 
 * Gruntfile for The Web Boilerplate.
 * 
 * DEV URL: http://localhost:9001/
 * DEV URL for devices on the same LAN: http://{yourIPaddress}:9001/
 * 
 * @author Aki Karkkainen
 * Twitter: http://twitter.com/akikoo
 * 
 */

// Needed for `grunt-contrib-livereload`.
var path        = require('path'),
    lrSnippet   = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
    folderMount = function folderMount(connect, point) {
        return connect.static(path.resolve(point));
    };

// Grunt configuration wrapper function.
module.exports = function (grunt) {

    'use strict';

    // Configurable paths and other variables. 
    var config = {
        webroot: 'webroot',
        testroot: 'test',
        dist: 'webroot-built',
        version: 'v<%= pkg.version %>',
        watches: {
            html: [
                '<%= config.webroot %>/html/*.html',
                '<%= config.webroot %>/html/**/*.html',
                '<%= config.webroot %>/html/**/*.view',
                '<%= config.webroot %>/html/**/*.hbs'
            ],
            js: [
                '<%= config.webroot %>/js/app/**/*.js'
            ]
        }
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
         * Start a static web server.
         * DEV URL http://localhost:9001/.
         * To view the local site on another device on the same LAN, use your master machine's IP address instead, for example http://157.125.83.183:9001/.
         */
        connect: {
            livereload: {
                options: {
                    port: 9001, // The port on which the webserver will respond.
                    hostname: '*', // Default 'localhost'. Setting this to '*' will make the server accessible from anywhere. Useful for cross-device testing.
                    base: '<%= config.webroot %>'
                }
            }
        },


        /*
         * Run predefined tasks whenever watched file patterns are added, changed or deleted.
         */
        watch: {
            options: {
                // Reload assets live in the browser.
                livereload: 35729 // Default livereload listening port.
            },
            html: {
                files: '<%= config.watches.html %>',
                tasks: [
                    'buildhtml'
                ]
            },
            css: {
                files: ['<%= config.webroot %>/scss/**/*.scss'],
                tasks: [
                    'compass'
//					'csslint'
                ]
            },
            js: {
                files: '<%= config.watches.js %>',
                tasks: [
//                    'jshint'
                ]
            },
			jsonData: {
				files: ['<%= config.webroot %>/html/data/*.json'],
				tasks: [
                    'buildhtml'
				]
			},

            // Run unit tests with karma (server needs to be already running).
            karma: {
                files: ['<%= config.testroot %>/spec/*Spec.js'],
//                tasks: ['karma:unit:run'] //NOTE the :run flag
            }
        },


        /*
         * Compile Sass to CSS using Compass.
         */
        compass: {
            dist: {
                options: {
                    httpPath: '/',
                    cssDir: '<%= config.webroot %>/css',
                    sassDir: '<%= config.webroot %>/scss',
                    imagesDir: '<%= config.webroot %>/img',
                    javascriptsDir: '<%= config.webroot %>/js',
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    noLineComments: false,
                    force: true,
                    raw: 'Sass::Script::Number.precision = 15\n' // Use `raw` since it's not directly available.
                }
            }
        },


        /*
         * Lint CSS files.
         */
        csslint: {
            options: {
                csslintrc: '.csslintrc' // Get CSSLint options from external file.
            },
            strict: {
                options: {},
                src: ['<%= config.webroot %>/css/*.css']
            },
            lax: {
                options: {}
                // src: ['www/css/common/*.css']
            }
        },


        /*
         * Validate files with JSHint.
         */
        jshint: {
            // Configure JSHint (documented at http://www.jshint.com/docs/).
            options: {
                jshintrc: '.jshintrc' // Get JSHint options from external file.
            },
            // Define the files to lint.
            files: [
                'Gruntfile.js',
                '<%= config.webroot %>/js/app/**/*.js' // Only process custom scripts, exclude libraries.
            ]
        },

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
					cwd: '<%= config.webroot %>/icons/svg/sprite',
					// wich files to get.
					src: ['*.svg', '*.png'],
					// where to put css
					dest: '<%= config.webroot %>/icons/output/css/'
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
                    cssprefix: 'icon-',
					// custom template for creating css.
					template: '<%= config.webroot %>/icons/templates/grunticon-css-template.hbs'

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
                src: '<%= config.webroot %>/icons/svg/font/*.svg',
                // where to put the fonts
				dest: '<%= config.webroot %>/icons/output/fonts',
				// where to put the css
                destCss: '<%= config.webroot %>/icons/output/css',
                options: {
					// wich font-engine do we use (node cause it's already installed)
                    engine: 'node',
					// css class-prefix
                    font: 'icons-font',
					// type of stylesheet generated
                    stylesheet: 'css',
					// where to put an example html.
                    destHtml: '<%= config.webroot %>/icons/output/html/',
					// path to custom css.file template.
					template: '<%= config.webroot %>/icons/templates/webfont-css-template.css'
					// support ie7 ?
//                    ie7: true
                }
            }
        },

        /*
         * Optimize RequireJS projects using r.js.
         */
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js',                          // The JS source dir, relative to the 'appDir' if set below. No forward slash here!
                    appDir: '<%= config.webroot %>',          // The top level assets directory, relative to this file. All the files from this directory will be copied to 'dir'.
                    dir: '<%= config.dist %>',                // The CSS and JS output dir, relative to this file.
                    mainConfigFile: '<%= config.webroot %>/js/config.js', // Include the main configuration file (paths, shim). Relative to this file.
                    optimize: 'uglify',                     // (default) uses UglifyJS to minify the code.
                    skipDirOptimize: true,                  // Set to true, to skip optimizing other non-build layer JS files (speeds up builds).
                    optimizeCss: 'standard',                // @import inlining, comment removal and line returns.
                    fileExclusionRegExp: /^\.|\.((json))|scss$/, // If the regexp matches, it means the file/directory will be excluded.

                    // List of modules that will be optimized. All their immediate and deep dependencies will be included.
                    modules: [
                        // First set up the common build layer. Module names are relative to 'baseUrl'.
                        {
                            name: 'config',
                            // List common dependencies here. Only need to list top level dependencies, "include" will find nested dependencies.
                            include: [
								'graphite',
								'graphite_utilities',
								'graphite_responsive',
                                'jquery',
								'handlebars',
								'backbone',
								'underscore',
								'text',
								'fastclick',
								'chartjs',
								'moment'
                            ]
                        },
                        // Now set up a build layer for each main layer, but exclude the common one.
                        // "exclude" will exclude the nested, built dependencies from "common".
                        // Any "exclude" that includes built modules should be listed before the
                        // build layer that wants to exclude it. The "mainpage" and "subpage" modules
                        // are **not** the targets of the optimization, because shim config is
                        // in play, and shimmed dependencies need to maintain their load order.
                        // In this example, config.js will hold jquery, so backbone needs to be
                        // delayed from loading until config.js finishes. That loading sequence
                        // is controlled in mainpage.js.
                        {
                            name: 'app/mainpage',
                            exclude: ['config']
                        }
                    ]
                }
            }
        },


        /*
         * Grunt plugin for karma test runner.
         */
        karma: {
            unit: {
              configFile: 'karma.conf.js',
              background: false // Don't block subsequent grunt tasks.
            },
            // Continuous integration mode: run tests once in PhantomJS browser.
            // Run this with `grunt karma:continuous`
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: false,
                browsers: ['PhantomJS']
            }
        },


        /*
         * Minify PNG and JPEG images using OptiPNG and jpegtran.
         */
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3 // PNG only.
                },
                files: [{
                    expand: true,                       // Enable dynamic expansion.
                    cwd: '<%= config.webroot %>/img/',  // Src matches are relative to this path.
                    src: '**/*.{png,jpg,jpeg}',         // Actual pattern(s) to match.
                    dest: '<%= config.dist %>/img/'     // Destination path prefix.
                }]
            }
        },


        /*
         * Concatenate dynamic banner information to built CSS and JS files.
         */
        concat: {
            options: {
                stripBanners: true,                     // Strip any existing JavaScript banner comments from source files.
                banner: '<%= banner %>'                 // Get dynamic build header.
            },
            dist: {
                files: [
                    {
                        expand: true,                   // Enable dynamic expansion.
                        cwd: '<%= config.dist %>/',     // Src matches are relative to this path.
                        src: [                          // Actual pattern(s) to match.
                            'css/*.css',                // Process only main css files in CSS root.
                            'js/app/*.js',              // Process only main js files in JS app root.
                            'js/config.js'              // Process also the common layer. 
                        ],
                        dest: '<%= config.dist %>/',    // Destination path prefix.
                        nonull: false                   // Set nonull to true if you want the concat task to warn if a given file is missing or invalid.
                    }
                ]
            }
        },

		// Build Documentation from templates and data
		assemble: {
			options: {
				flatten: true,
				assets: '',
				helpers: ['webroot/html/helpers/*.js'],
				partials: ['webroot/html/includes/*.hbs', 'webroot/dist/components/**/*.hbs', 'webroot/html/includes/**/*.hbs'],
				layout: 'webroot/html/layouts/default.hbs',
				data: ['webroot/html/data/*.json']
			},
			index: {
				src: 'webroot/html/pages/index.hbs',
				dest: 'webroot/index.html'
			}
		},

		/*
		 * Copy relevant src files into dist
		 */
		copy: {
			dist: {
				files: [
					{
						expand: false,
						src: ['webroot/web.config'],
						dest: 'webroot-built/'
					}
				]
			}
		},
		rsync: {
			options: {
				args: ["--verbose"],
				exclude: [".git*","*.scss","node_modules", "logAM2302.json"],
				recursive: true
			},
			dist: {
				options: {
					src: "webroot-built/",
					dest: "www/",
					host: "pi@192.168.1.41"
				}
			}
		}

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks("grunt-rsync")
	grunt.loadNpmTasks('assemble');

    // The default (DEV) task can be run just by typing "grunt" on the command line.
    grunt.registerTask('default', [
        'buildhtml',
        'compass',
//        'csslint',
//        'jshint',
        'connect',
//        'karma:unit', // On change, run the tests specified in the unit target using the already running karma server.
        'watch'
    ]);

	grunt.registerTask('buildhtml', [
		'assemble'
	]);

    // This would be run by typing "grunt dist" on the command line.
    grunt.registerTask('dist', [
        'buildhtml',
        'compass',
//        'csslint',
//        'jshint',
//        'connect',
        // 'karma:continuous', // Run the tests specified in the continuous target using the already running karma server.
        'requirejs',
        //'yuidoc',
        'imagemin',
        'concat',
//		'rsync'
//		'copy:dist'
    ]);

	grunt.registerTask('deploy', [
		'buildhtml',
		'compass',
//        'csslint',
//        'jshint',
//		'connect',
		// 'karma:continuous', // Run the tests specified in the continuous target using the already running karma server.
		'requirejs',
		//'yuidoc',
		'imagemin',
		'concat',
		'rsync'
//		'copy:dist'
	]);

    // The icons generator would be run by typing "grunt icons" on the command line.
    grunt.registerTask('makeicons', [
        'grunticon',
        'webfont'
    ]);

};