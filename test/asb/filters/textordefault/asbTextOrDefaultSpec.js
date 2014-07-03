'use strict';

describe('filter: asbTextOrDefault', function () {
    var asbTextOrDefault;

    beforeEach(module('asb.filters.textordefault'));

    beforeEach(inject(function (_$filter_) {
        asbTextOrDefault = _$filter_('asbTextOrDefault');
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
});