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

        var person = new Person();

        var Person2 = Person.extend('Person', {
            attributes : {
                lastName: {
                    type: 'TEXT',
                    default: null
                }
            }
        });

        var person2 = new Person2();
        expect(person.name).toBe(null);
        expect(person.isNew()).toBe(true);
        expect(person.isDirty()).toBe(false);
    });

    it('checks for dirty on changes', function(){
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

        var person = new Person();

        person.name = 'John';
        expect(person.name).toBe('John');
        expect(person.isNew()).toBe(true);
        expect(person.isDirty()).toBe(true);
    });

    it('checks the entity validation', function(){
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

        var person = new Person();

        expect(person.name).toBe(null);
        expect(person.isValid('name')).toBe(false);
        expect(person.isValid()).toBe(false);

        person.name = 'John';
        expect(person.isValid('name')).toBe(true);
        expect(person.isValid()).toBe(true);
    });

    it('checks the entity inheritance and validation', function(){
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

        var Person2 = Person.extend('Person2', {
            attributes : {
                lastName : {
                    type : 'TEXT',
                    default : null,
                    constraints : {
                        nullable: false,
                        minSize: 5,
                        maxSize: 10
                    }
                }
            }
        });

        var person = new Person2();

        expect(person.name).toBe(null);
        expect(person.isValid('name')).toBe(false);
        expect(person.isValid()).toBe(false);

        person.name = 'John';
        expect(person.isValid('name')).toBe(true);
        expect(person.isValid()).toBe(false);

        person.lastName = 'Sm';
        expect(person.isValid('lastName')).toBe(false);
        expect(person.isValid()).toBe(false);

        person.lastName = 'Smith';
        expect(person.isValid('lastName')).toBe(true);
        expect(person.isValid()).toBe(true);

        person.lastName = 'Smithsonian';
        expect(person.isValid('lastName')).toBe(false);
        expect(person.isValid()).toBe(false);

        person.lastName = 'Smith';
        expect(person.isValid('lastName')).toBe(true);
        expect(person.isValid()).toBe(true);
    });
});