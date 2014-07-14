'use strict';

describe('service: asbEntity', function () {
    var asbEntity;
    beforeEach(module('asb.model.entity'));

    beforeEach(inject(function (_asbEntity_) {
        asbEntity = _asbEntity_;
    }));

    it('creates a new, clean entity', function () {
        var Person = asbEntity.extend('Person', {
            name: {
                type: 'TEXT',
                default: null
            }
        });

        var person = new Person();

        expect(person.name).toBe(null);
        expect(person._new).toBe(true);
        expect(person._dirty).toBe(false);

    });

    it('creates a new, dirty entity', function () {
        var Person = asbEntity.extend('Person', {
            name: {
                type: 'TEXT',
                default: null
            }
        });

        var person = new Person();
        var person2 = new Person();

        person.name = 'Johan';
        person2.name = 'Mark';

        expect(person.name).toBe('Johan');
        expect(person2.name).toBe('Mark');

        expect(person._new).toBe(true);
        expect(person2._new).toBe(true);

        expect(person._dirty).toBe(true);
        expect(person2._dirty).toBe(true);
    });
});