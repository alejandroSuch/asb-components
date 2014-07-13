'use strict';

(function () {
    angular
        .module('asb.model.entity', ['asb.model.constraints'])
        .service('asbEntity', ['asbConstraints', function (asbConstraints) {
            var __extends = function (d, b) {
                for (var p in b) {
                    if (b.hasOwnProperty(p)) {
                        d[p] = b[p];
                    }
                }

                function __() {
                    this.constructor = d;
                }

                __.prototype = b.prototype;
                d.prototype = new __();
            };

            var createEntity = function (name, attributes) {
                eval(
                        'var result = (' +
                        'function(){ ' +
                        'var initialData = attributes;' +
                        '__extends(' + name + ', Entity);' +
                        'function ' + name + '(){' +
                        'Entity.call(this, initialData);' +
                        '};' +
                        'return ' + name + ';' +
                        '}' +
                        ')();'
                );

                return result;
            };

            function flattenArray(oArray) {
                var retVal = [];

                for (var i = 0; i < oArray.length; i++) {
                    if (!(oArray[i] instanceof Array)) {
                        retVal.push(oArray[i]);
                    } else {
                        var tempFlatt = flattenArray(oArray[i]);

                        for (var j = 0; j < tempFlatt.length; j++) {
                            retVal.push(tempFlatt[j]);
                        }
                    }
                }
                return retVal;
            };

            function isEmptyObject(object) {
                if (!(typeof object === 'object')) {
                    return true;
                }

                for (var key in object) {
                    if (hasOwnProperty.call(object, key)) {
                        return false;
                    }
                }

                return true;
            }

            var reservedWords = ['id'];

            var validTypes = {
                'INT': 'INTEGER',
                'BOOLEAN': 'INTEGER',
                'DATE': 'INTEGER',
                'DATETIME': 'INTEGER',
                'FLOAT': 'REAL',
                'TEXT': 'TEXT'
            };

            var Entity = function (attributes) {
                if (isEmptyObject(attributes)) {
                    throw 'You must provide some initial data';
                }
                ;

                this._new = true;
                this._dirty = false;
                this._valid = true;
                this._attributes = attributes;
                this._values = {};
                this._dirtyValues = {};

                //TODO: Initialize
                for (var i in this._attributes) {
                    if (!validTypes.hasOwnProperty([this._attributes[i].type.toUpperCase()])) {
                        throw this._attributes[i].type + ' is not a valid type';
                    }

                    this[value] = attributes[i].default ? attributes[i].default : null;
                }
            };

            Entity.prototype.validate = function (attribute) {
                if (typeof attribute === 'undefined') {
                    for (var i in this._attributes) {
                        this.validate('i');
                    }
                }

                if (!this._values.hasOwnProperty(attribute)) {
                    this._valid = false;
                    throw 'Property ' + attribute + ' does not exist';
                }


            };

            Entity.prototype.isDirty = function () {
                return this._dirty;
            };

            Entity.prototype.isNew = function () {
                return this._new;
            };

            Entity.prototype.isValid = function () {
                for (var i in this._values) {
                    if (!this._values[i].valid) {
                        return false;
                    }
                }

                return true;
            };

            Entity.extend = function (name, attributes) {
                if (isEmptyObject(attributes)) {
                    throw 'You must provide a valid non empty object';
                }

                var resultEntity = createEntity(name, attributes);

                for (var attribute in attributes) {
                    if (reservedWords.indexOf(attribute) !== -1) {
                        throw attribute + ' is a reserved word and cannot be used';
                    }

                    resultEntity.prototype.__defineGetter__(attribute, function () {
                        return this._values[attribute].value;
                    });

                    resultEntity.prototype.__defineSetter__(attribute, function (value) {
                        if (this._values[attribute] !== value) {

                            this._values[attribute] = {
                                value: value,
                                valid: true,
                                validationErorrs: []
                            };

                            var constraints = this._attributes[attribute].constraints;

                            if (!isEmptyObject(constraints)) {
                                for (var i in constraints) {
                                    if (!asbConstraints[i].apply(this, flattenArray([this._values[attribute].value, constraints[i]]))) {
                                        this._values[attribute].valid = false;
                                        //TODO: add default error messages
                                        //this._values[attribute].valid = asbConstraints[i+'Message'];
                                    }
                                }
                            }

                            this._dirtyValues[attribute] = value;
                            this._dirty = true;
                        }
                    });

                    //TODO: AUTO-CREATE VALIDATION DIRECTIVES
                }

                return resultEntity;
            };

            return Entity;
        }]);
})();


