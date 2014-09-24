'use strict';

describe('service: asbEntity', function () {
    var Entity;
    beforeEach(module('asb.model.entity'));

    beforeEach(inject(function (_Entity_) {
        Entity = _Entity_;
    }));

    it('creates a new, clean entity', function () {
        //Person = Entity.extend({ attributes: {name:{type:'text', constraints:{ nullable:false}}}});

        var Person = Entity.extend('Person', {
            attributes : {
                name: {
                    type: 'TEXT',
                    default: null,
                    constraints: {
                        nullable: false
                    }
                }
            }
        });
        console.log('Person', Person);

        var person = new Person();

        var Person2 = Person.extend('Person', {
            attributes : {
                lastName: {
                    type: 'TEXT',
                    default: null
                }
            }
        });

        console.log('Person2', Person2);

        var person2 = new Person2();

        console.log('person', person);
        dump(person);
        dump(person.attributes);
        console.log('person2', person2);
        dump(person2)
        dump(person2.attributes)
        /*expect(person.name).toBe(null);
        expect(person._new).toBe(true);
        expect(person._dirty).toBe(false);*/

    });

    /*it('creates a new, dirty entity', function () {
        var Person = Entity.extend('Person', {
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
        expect(person.isNew()).toBe(true);
        expect(person2._new).toBe(true);
        expect(person2.isNew()).toBe(true);

        expect(person._dirty).toBe(true);
        expect(person.isDirty()).toBe(true);
        expect(person2._dirty).toBe(true);
        expect(person2.isDirty()).toBe(true);
    });

    it('creates throws an exception because of an unknown property', function () {
        var Person = Entity.extend('Person', {
            name: {
                type: 'TEXT',
                default: null
            }
        });

        var person = new Person();

        person.name = 'Johan';

        expect(person.name).toBe('Johan');

        var testFn = function(){
            person.lastName = 'Cruyff';
        };

        expect(person.name).toBe('Johan');
        expect(testFn).toThrow('Unknown property \'Cruyff\'');
        expect(person._new).toBe(true);
        expect(person.isNew()).toBe(true);
        expect(person._dirty).toBe(true);
        expect(person.isDirty()).toBe(true);
    });*/
});