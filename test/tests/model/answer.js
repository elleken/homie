describe('Answer persist', function(){

    'use strict';

    it('Saves answer', function() {

        require(['graphite_quiz', 'answer'], function ( quiz, Answer ) {

            var quiz =  G.initialize("m_quiz", {
                persistLayer :  G.parsePersist.add( {
                    user : "ls05zeRMppvTJxIdBfXMjrhAPZnjq5yAjhVhMghN",
                    password : "vwX2iMjHfBNu3DjVGKaVnbDM8aOSLMo4G1dkzlgd"
                })
            });

            var answer = new Answer();
            answer.name = "321";
            quiz.saveAnswer(answer, function(answer){
                expect(answer.id).toBeDefined();
            });

        });

    });

    it('Gets answer', function(){

        require(['graphite_quiz', 'answer'], function ( quiz, Answer ) {

            var quiz =  G.initialize("m_quiz", {
                persistLayer :  G.parsePersist.add( {
                    user : "ls05zeRMppvTJxIdBfXMjrhAPZnjq5yAjhVhMghN",
                    password : "vwX2iMjHfBNu3DjVGKaVnbDM8aOSLMo4G1dkzlgd"
                })
            });

            // clean up
            quiz.get("Answer", { name : "campaign", value : "test" }, function(results){
                for (var i = 0 ; i < results.length ; i ++){
                    quiz.remove(results[i]);
                }

                // create 1 and retrieve
                var answer = new Answer();
                answer.campaign = "test";
                quiz.saveAnswer(answer, function(answer){
                    quiz.get("Answer", { name : "campaign", value : "test" }, function(results){
                        expect(results.length).toEqual(1);
                    });

                });
            });

        });
    });

});