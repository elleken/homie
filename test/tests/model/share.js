describe('Share persist', function(){

    'use strict';

    it('Saves share', function() {

        require(['graphite_quiz', 'share'], function ( quiz, Share ) {

            var quiz =  G.initialize("m_quiz", {
                persistLayer :  G.parsePersist.add( {
                    user : "ls05zeRMppvTJxIdBfXMjrhAPZnjq5yAjhVhMghN",
                    password : "vwX2iMjHfBNu3DjVGKaVnbDM8aOSLMo4G1dkzlgd"
                })
            });

            var share = new Share();
            share.name = "321";
            quiz.saveShare(share, function(share){
                expect(share.id).toBeDefined();
            });

        });

    });
});