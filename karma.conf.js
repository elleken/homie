/*
 * 
 * $Id: karma.conf.js 37 2013-06-03 09:55:17Z akikar $
 * 
 * Karma configuration.
 * 
 */

// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [

    // Adapters
    JASMINE,
    JASMINE_ADAPTER,
    REQUIRE,
    REQUIRE_ADAPTER,

    // Which files do you want to test?
    // 
    // Choose all the files we want to load with Require.js.
    {pattern: 'webroot/js/lib/**/*.js', included: false},       // All external libraries.
    {pattern: 'webroot/js/app/**/*.js', included: false},    // Our source code.
    {pattern: 'test/tests/**/*.js', included: true},        // load everything under /tests folder
    //{pattern: 'test/spec/*Spec.js', included: false},        // All the tests.

    // Which files do you want to include with <script> tag?
    // 
    // Choose all files which are not loaded by Require.js. 
    // Usually you'll only need to include your test-main.js file, 
    // which has the same role for your tests as main.js has for 
    // your app when using Require.js.
    'test/test-main.js'
];



// list of files to exclude
// We don't want to actually start the application in our tests.
exclude = [
    'webroot/js/app/mainpage.js',
    'webroot/js/app/subpage.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['dots'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = [
    // 'PhantomJS' 
    // 'Safari', 
];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

