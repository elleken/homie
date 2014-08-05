/*
 * $Id: Spec.js 29 2013-05-13 14:59:40Z akikar $
 * 
 * Sample test.
 */


require(['underscore'], function(_) {

    describe('Just checking', function() {

        it('works for underscore', function() {
            // just checking that _ works
            expect(_.size([1,2,3])).toEqual(2);
        });

   });

});


