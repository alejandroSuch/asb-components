'use strict';

describe('provider: asbConstraintsProvider', function () {
    var theProvider;
    var undefinedVar;

    beforeEach(module('asb.model.constraints'));

    beforeEach(function () {
        // Initialize the service provider by injecting it to a fake module's config block
        var fakeModule = angular
            .module('test.app.config', function () {
            }).config(function (asbConstraintsProvider) {
                theProvider = asbConstraintsProvider;
            });

        // Initialize test.app injector
        module('asb.model.constraints', 'test.app.config');

        // Kickstart the injectors previously registered with calls to angular.mock.module
        inject(function () {
        });
    });


    it('tests the providers has been injected', function () {
        expect(theProvider).not.toBeUndefined();
    });

    it('tests the blank constraint', function () {
        var blankConstraint = theProvider.$get().blank;

        expect(blankConstraint('', true)).toBe(true);
        expect(blankConstraint('', false)).toBe(false);

        expect(blankConstraint(undefinedVar, true)).toBe(true);
        expect(blankConstraint(undefinedVar, false)).toBe(false);

        expect(blankConstraint(null, true)).toBe(true);
        expect(blankConstraint(null, false)).toBe(false);

        expect(blankConstraint('hello', true)).toBe(true);
        expect(blankConstraint('hello', false)).toBe(true);
    });

    it('tets the creditCard constraint', function () {
        var creditCardConstraint = theProvider.$get().creditCard;
        var testFn = function () {
            creditCardConstraint(null, true);
        };

        expect(testFn).toThrow('CreditCard constraint: Not implemented yet');
    });

    it('tests the email constraint', function () {
        var emailConstraint = theProvider.$get().email;

        expect(emailConstraint('', true)).toBe(false);
        expect(emailConstraint('', false)).toBe(true);

        expect(emailConstraint(undefinedVar, true)).toBe(false);
        expect(emailConstraint(undefinedVar, false)).toBe(true);

        expect(emailConstraint(null, true)).toBe(false);
        expect(emailConstraint(null, false)).toBe(true);


        expect(emailConstraint('admin', true)).toBe(false);
        expect(emailConstraint('admin', false)).toBe(true);

        expect(emailConstraint('admin@', true)).toBe(false);
        expect(emailConstraint('admin@', false)).toBe(true);

        expect(emailConstraint('admin@admin', true)).toBe(true);
        expect(emailConstraint('admin@admin', false)).toBe(true);

        expect(emailConstraint('admin@admin.', true)).toBe(false);
        expect(emailConstraint('admin@admin.', false)).toBe(true);

        expect(emailConstraint('admin@admin.com', true)).toBe(true);
        expect(emailConstraint('admin@admin.com', false)).toBe(true);
    });

    it('tests the inList constraint', function () {
        var inListConstraint = theProvider.$get().inList;

        var testFn = function () {
            inListConstraint(null, true);
        };

        var testFn2 = function () {
            inListConstraint(null, 1);
        };

        var testFn2 = function () {
            inListConstraint(null, 'hello');
        };

        var testFn3 = function () {
            inListConstraint(null, { name: 'John', lastName: 'Locke'});
        };

        expect(testFn).toThrow('InList constraint only applies to Arrays');
        expect(testFn2).toThrow('InList constraint only applies to Arrays');
        expect(testFn3).toThrow('InList constraint only applies to Arrays');

        expect(inListConstraint('a', ['a', 'b', 'c'])).toBe(true);
        expect(inListConstraint('d', ['a', 'b', 'c'])).toBe(false);
        expect(inListConstraint(1, ['a', 'b', 'c'])).toBe(false);
        expect(inListConstraint(1, ['1', '2', '3'])).toBe(false);
        expect(inListConstraint(1, [1, 2, 3])).toBe(true);
        expect(inListConstraint(undefinedVar, [1, 2, 3])).toBe(false);
        expect(inListConstraint(undefinedVar, ['a', 'b', 'c'])).toBe(false);
        expect(inListConstraint(null, ['a', 'b', 'c'])).toBe(false);
        expect(inListConstraint(null, ['a', 'b', 'c', null])).toBe(true);
    });

    it('tests the regex constraint', function () {
        var matchesConstraint = theProvider.$get().matches;
        var emailRegex = '^[a-z0-9!#$%&\'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$';

        var testFn = function () {
            matchesConstraint(5, emailRegex);
        };

        var testFn2 = function () {
            matchesConstraint(undefinedVar, emailRegex);
        };

        var testFn3 = function () {
            matchesConstraint(null, emailRegex);
        };

        var testFn4 = function () {
            matchesConstraint([], emailRegex);
        };

        var testFn5 = function () {
            matchesConstraint({}, emailRegex);
        };

        expect(testFn).toThrow('Matches constraint only applies to Strings');
        expect(testFn2).toThrow('Matches constraint only applies to Strings');
        expect(testFn3).toThrow('Matches constraint only applies to Strings');
        expect(testFn4).toThrow('Matches constraint only applies to Strings');
        expect(testFn5).toThrow('Matches constraint only applies to Strings');

        expect(matchesConstraint('', emailRegex)).toBe(false);
        expect(matchesConstraint('admin', emailRegex)).toBe(false);
        expect(matchesConstraint('admin@', emailRegex)).toBe(false);
        expect(matchesConstraint('admin@admin', emailRegex)).toBe(true);
        expect(matchesConstraint('admin@admin.', emailRegex)).toBe(false);
        expect(matchesConstraint('admin@admin.com', emailRegex)).toBe(true);

    });

    it('tests the max constraint', function () {
        var maxConstraint = theProvider.$get().max;
        var throwErr = 'Max constraint only applies to numbers';

        var testFn = function () {
            maxConstraint('5', 4);
        };

        var testFn2 = function () {
            maxConstraint(undefinedVar, 4);
        };

        var testFn3 = function () {
            maxConstraint(null, 4);
        };

        var testFn4 = function () {
            maxConstraint([], 4);
        };

        var testFn5 = function () {
            maxConstraint({}, 4);
        };

        expect(testFn).toThrow(throwErr);
        expect(testFn2).toThrow(throwErr);
        expect(testFn3).toThrow(throwErr);
        expect(testFn4).toThrow(throwErr);
        expect(testFn5).toThrow(throwErr);

        expect(maxConstraint(1,4)).toBe(true);
        expect(maxConstraint(4,4)).toBe(true);
        expect(maxConstraint(5,4)).toBe(false);
    });

    it('tests the maxSize constraint', function(){
        var maxSizeConstraint = theProvider.$get().maxSize;
        var throwErr = 'MinSize constraint only applies to Arrays and Strings';
    });

    it('tests the min constraint', function () {
        var minConstraint = theProvider.$get().min;
        var throwErr = 'Min constraint only applies to numbers';

        var testFn = function () {
            minConstraint('5', 4);
        };

        var testFn2 = function () {
            minConstraint(undefinedVar, 4);
        };

        var testFn3 = function () {
            minConstraint(null, 4);
        };

        var testFn4 = function () {
            minConstraint([], 4);
        };

        var testFn5 = function () {
            minConstraint({}, 4);
        };

        expect(testFn).toThrow(throwErr);
        expect(testFn2).toThrow(throwErr);
        expect(testFn3).toThrow(throwErr);
        expect(testFn4).toThrow(throwErr);
        expect(testFn5).toThrow(throwErr);

        expect(minConstraint(1,4)).toBe(false);
        expect(minConstraint(4,4)).toBe(true);
        expect(minConstraint(5,4)).toBe(true);
    });




});
