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

        expect(maxConstraint(1, 4)).toBe(true);
        expect(maxConstraint(4, 4)).toBe(true);
        expect(maxConstraint(5, 4)).toBe(false);
    });

    it('tests the maxSize constraint', function () {
        var maxSizeConstraint = theProvider.$get().maxSize;
        var throwErr = 'MaxSize constraint only applies to Arrays and Strings';
        var throwErr2 = 'Argument maxSize should be a number';

        var testFn = function () {
            maxSizeConstraint(undefinedVar, '');
        };

        var testFn2 = function () {
            maxSizeConstraint(undefinedVar, 4);
        };

        var testFn3 = function () {
            maxSizeConstraint(null, 4);
        };

        var testFn5 = function () {
            maxSizeConstraint({}, 4);
        };

        expect(testFn).toThrow(throwErr2);
        expect(testFn2).toThrow(throwErr);
        expect(testFn3).toThrow(throwErr);
        expect(testFn5).toThrow(throwErr);

        expect(maxSizeConstraint('hello', 4)).toBe(false);
        expect(maxSizeConstraint('hello', 5)).toBe(true);
        expect(maxSizeConstraint('hello', 6)).toBe(true);

        expect(maxSizeConstraint([1, 2, 3, 4, 5], 4)).toBe(false);
        expect(maxSizeConstraint([1, 2, 3, 4, 5], 5)).toBe(true);
        expect(maxSizeConstraint([1, 2, 3, 4, 5], 6)).toBe(true);
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

        expect(minConstraint(1, 4)).toBe(false);
        expect(minConstraint(4, 4)).toBe(true);
        expect(minConstraint(5, 4)).toBe(true);
    });

    it('tests the minSize constraint', function () {
        var minSizeConstraint = theProvider.$get().minSize;
        var throwErr = 'MinSize constraint only applies to Arrays and Strings';
        var throwErr2 = 'Argument minSize should be a number';

        var testFn = function () {
            minSizeConstraint(undefinedVar, '');
        };

        var testFn2 = function () {
            minSizeConstraint(undefinedVar, 4);
        };

        var testFn3 = function () {
            minSizeConstraint(null, 4);
        };

        var testFn5 = function () {
            minSizeConstraint({}, 4);
        };

        expect(testFn).toThrow(throwErr2);
        expect(testFn2).toThrow(throwErr);
        expect(testFn3).toThrow(throwErr);
        expect(testFn5).toThrow(throwErr);

        expect(minSizeConstraint('hello', 4)).toBe(true);
        expect(minSizeConstraint('hello', 5)).toBe(true);
        expect(minSizeConstraint('hello', 6)).toBe(false);

        expect(minSizeConstraint([1, 2, 3, 4, 5], 4)).toBe(true);
        expect(minSizeConstraint([1, 2, 3, 4, 5], 5)).toBe(true);
        expect(minSizeConstraint([1, 2, 3, 4, 5], 6)).toBe(false);
    });

    it('tests the notEqual constraint', function () {
        var notEqualConstraint = theProvider.$get().notEqual;

        var testFn = function () {
            notEqualConstraint(1, 1);
        };

        expect(testFn).toThrow('NotEqual constraint: Not implemented yet');
    });

    it('tests the nullable constraint', function () {
        var nullableConstraint = theProvider.$get().nullable;

        expect(nullableConstraint('', true)).toBe(true);
        expect(nullableConstraint('', false)).toBe(true);

        expect(nullableConstraint(null, true)).toBe(true);
        expect(nullableConstraint(null, false)).toBe(false);

        expect(nullableConstraint(undefinedVar, true)).toBe(true);
        expect(nullableConstraint(undefinedVar, false)).toBe(false);
    });

    it('tests the numeric constraint', function () {
        var numericConstraint = theProvider.$get().numeric;
        var throwErr = 'Numeric constraint expects two arguments';

        var testFn = function () {
            numericConstraint('a');
        };

        expect(testFn).toThrow(throwErr);

        expect(numericConstraint(5, true)).toBe(true);
        expect(numericConstraint(5, false)).toBe(true);

        expect(numericConstraint(null, true)).toBe(false);
        expect(numericConstraint(null, false)).toBe(true);

        expect(numericConstraint(undefinedVar, true)).toBe(false);
        expect(numericConstraint(undefinedVar, false)).toBe(true);

        expect(numericConstraint('5', true)).toBe(false);
        expect(numericConstraint('5', false)).toBe(true);

        expect(numericConstraint([], true)).toBe(false);
        expect(numericConstraint([], false)).toBe(true);

        expect(numericConstraint({}, true)).toBe(false);
        expect(numericConstraint({}, false)).toBe(true);
    });

    it('tests the range constraint', function () {
        var rangeConstraint = theProvider.$get().range;
        var throwErr = 'Range constraint expects three arguments';
        var throwErr2 = 'All three values must be numbers';

        var testFn = function () {
            rangeConstraint('a', '1');
        };

        var testFn2 = function () {
            rangeConstraint('a', '1', 10);
        };

        expect(testFn).toThrow(throwErr);
        expect(testFn2).toThrow(throwErr2);

        expect(rangeConstraint(5, 0, 10)).toBe(true);
        expect(rangeConstraint(0, 0, 10)).toBe(true);
        expect(rangeConstraint(10, 0, 10)).toBe(true);
        expect(rangeConstraint(-1, 0, 10)).toBe(false);
        expect(rangeConstraint(11, 0, 10)).toBe(false);
    });

    it('tests the size constraint', function () {
        var sizeConstraint = theProvider.$get().size;
        var throwErr = 'Size constraint expects three arguments';
        var throwErr2 = 'Size constraint only applies to Arrays and Strings';
        var throwErr3 = 'Start and end values must be numbers';

        var testFn = function () {
            sizeConstraint('a', '1');
        };

        var testFn2 = function () {
            sizeConstraint({}, 1, 10);
        };

        var testFn3 = function () {
            sizeConstraint('a', '1', 10);
        };

        expect(testFn).toThrow(throwErr);
        expect(testFn2).toThrow(throwErr2);
        expect(testFn3).toThrow(throwErr3);

        expect(sizeConstraint("hello", 0, 5)).toBe(true);
        expect(sizeConstraint("", 0, 5)).toBe(true);
        expect(sizeConstraint("hi", 0, 5)).toBe(true);
        expect(sizeConstraint("hello world", 0, 5)).toBe(false);

        expect(sizeConstraint([1, 2, 3, 4, 5], 0, 5)).toBe(true);
        expect(sizeConstraint([], 0, 5)).toBe(true);
        expect(sizeConstraint([1, 2], 0, 5)).toBe(true);
        expect(sizeConstraint([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 5)).toBe(false);
    });

    it('tests the unique constraint', function () {
        var uniqueConstraint = theProvider.$get().unique;

        var throwErr = 'Unique constraint: not implemented yet';

        var testFn = function () {
            uniqueConstraint('a', true);
        };

        expect(testFn).toThrow(throwErr);
    });

    it('tests the url constraint', function () {
        var urlConstraint = theProvider.$get().url;

        var throwErr = 'Url constraint: expected 2 arguments';
        var throwErr2 = 'Url constraint: value expected to be a string';
        var throwErr3 = 'Url constraint: url expected to be a boolean';

        var testFn = function () {
            urlConstraint(1);
        };

        var testFn2 = function () {
            urlConstraint(1, true);
        };

        var testFn3 = function () {
            urlConstraint('1', 'true');
        };

        expect(testFn).toThrow(throwErr);
        expect(testFn2).toThrow(throwErr2);
        expect(testFn3).toThrow(throwErr3);

        expect(urlConstraint('www.ua.es', false)).toBe(true);
        expect(urlConstraint('asdf', true)).toBe(false);
        expect(urlConstraint('www.ua.es', true)).toBe(false);
        expect(urlConstraint('http://www.ua.es', true)).toBe(true);
    });

    it('tests a custom constraint', function () {
        theProvider.addConstraint('customConstraint', function (value, needsToBeFive) {
            if (needsToBeFive) {
                return value === 5;
            }

            return true;
        });

        var customConstraint = theProvider.$get().customConstraint;

        expect(customConstraint(5, true)).toBe(true);
        expect(customConstraint(4, false)).toBe(true);
        expect(customConstraint(54, true)).toBe(false);
    });

    it('should fail trying to override an existing constraint', function () {
        var throwErr = 'Cannot override a default constraint';
        var testFn = function() {
            theProvider.addConstraint('url', function (value, needsToBeFive) {
                if (needsToBeFive) {
                    return value === 5;
                }

                return true;
            });
        };

        expect(testFn).toThrow(throwErr);
    });


});
