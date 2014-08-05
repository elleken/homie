/*
 * $Id: test-main.js 37 2013-06-03 09:55:17Z akikar $
 * 
 * Configures Require.js for the tests.
 * See https://github.com/kjbekkelund/karma-requirejs
 */

var tests = [];

for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}
/*
define(['graphite',
    'jquery',
    'answer'
], function ( G, $, Answer) {
    return module( G, $, Answer, config )
});
*/
requirejs.config({

    // Karma serves files from '/base'
    baseUrl: 'http://localhost:9001',

    paths: {

        //backbone: 'lib/backbone/backbone',

        // Core libraries.
        jquery: 'lib/jquery/jquery',
        underscore: 'lib/underscore/underscore',
        backbone: 'lib/backbone/backbone',
        graphite:   'lib/graphite-lib/components/_base/js/graphite-core',

        // Templating.
        handlebars: 'lib/handlebars/handlebars',

        // Plugins.
        text : 'lib/requirejs-text/text',
        parse : 'http://www.parsecdn.com/js/parse-1.2.13.min',

        // Graphite
        graphite_storage : 'lib/graphite-lib/components/_base/js/graphite-storage',
        graphite_pubsub : 'lib/graphite-lib/components/_base/js/graphite-pubsub',
        graphite_codegrabber : 'lib/graphite-lib/components/_base/js/graphite-codegrabber',
        graphite_utilities : 'lib/graphite-lib/components/_base/js/graphite-utilities',

        // graphite dev-lib
        graphite_parsePersist : 'dev-lib/graphite-lib/components/_base/js/graphite-parsePersist',

        graphite_quiz : 'dev-lib/graphite-m-quiz/js/m_quiz',

        // Models
        answer: 'js/models/answer',
        question: 'js/models/question',
        questions: 'js/collections/questions',
        compliment: 'js/models/compliment',
        compliments: 'js/collections/compliments',
        result: 'js/models/result',
        share: 'js/models/share',
        person: 'js/models/person'
    },

    shim: {
        graphite_parsePersist : { deps : ['parse']},

        answer : { deps : ['parse'], exports : 'Answer'},
        question : { deps : ['parse'], exports : 'Question'},
        questions : { deps : ['question'], exports : 'Questions'},
        compliment : { deps : ['parse'], exports : 'Compliment'},
        compliments : { deps : ['question'], exports : 'Compliments'},
        result : { deps : ['parse'], exports : 'Result'},
        share : { deps : ['parse'], exports : 'Share'},
        person : { deps : ['parse'], exports : 'Person'},

        graphite_quiz : { deps : ['graphite_parsePersist', 'answer', 'question', 'questions', 'compliment', 'compliments', 'result', 'share', 'person' ] },

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
    },

    // Ask Require.js to load these files (all our tests)
    deps: tests,

    // Start test run, once Require.js is done
    callback: window.__karma__.start
});