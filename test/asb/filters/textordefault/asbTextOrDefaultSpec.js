'use strict';

describe('filter: asbTextOrDefault', function () {
    var asbTextOrDefault;

    beforeEach(module('asb.filters.textordefault'));

    beforeEach(inject(function (_asbTextOrDefaultFilter_) {
        asbTextOrDefault = _asbTextOrDefaultFilter_;
    }));

    it("should return '-'", function () {
        expect(asbTextOrDefault(null)).toBe('-');
        expect(asbTextOrDefault('')).toBe('-');
        expect(asbTextOrDefault('   ')).toBe('-');
    });

    it("should return 'N/D'", function () {
        expect(asbTextOrDefault(null, 'N/D')).toBe('N/D');
        expect(asbTextOrDefault('', 'N/D')).toBe('N/D');
        expect(asbTextOrDefault('  \n\t ', 'N/D')).toBe('N/D');
    });

    it("should return the same value", function () {
        var hello = 'hello';
        expect(asbTextOrDefault(hello, 'N/D')).toBe(hello);
        expect(asbTextOrDefault(hello)).toBe(hello);

        var helloWithSpaces = '   hello   ';
        expect(asbTextOrDefault(helloWithSpaces, 'N/D')).toBe(helloWithSpaces);
        expect(asbTextOrDefault(helloWithSpaces)).toBe(helloWithSpaces);
    });

    it("should return the same value (non-string)", function () {
        var hello = 1;
        var undefinedVar;

        expect(asbTextOrDefault(hello, 'N/D')).toBe('1');
        expect(asbTextOrDefault(hello)).toBe('1');

        hello = [];
        expect(asbTextOrDefault(hello, 'N/D')).toBe('N/D');
        expect(asbTextOrDefault(hello)).toBe('-');

        hello = {};
        expect(asbTextOrDefault(hello, 'N/D')).toBe('N/D');
        expect(asbTextOrDefault(hello)).toBe('-');

        expect(asbTextOrDefault(undefinedVar, 'N/D')).toBe('N/D');
        expect(asbTextOrDefault(undefinedVar)).toBe('-');
    });
});