describe('Person persist', function(){

    'use strict';

    it('Saves person', function() {

        require(['graphite_quiz', 'person'], function ( quiz, Person ) {

            var quiz =  G.initialize("m_quiz", {
                persistLayer :  G.parsePersist.add( {
                    user : "ls05zeRMppvTJxIdBfXMjrhAPZnjq5yAjhVhMghN",
                    password : "vwX2iMjHfBNu3DjVGKaVnbDM8aOSLMo4G1dkzlgd"
                })
            });

            var person = new Person();
            person.name = "321";
            quiz.savePerson(person, function(person){
                expect(person.id).toBeDefined();
            });

        });

    });
});