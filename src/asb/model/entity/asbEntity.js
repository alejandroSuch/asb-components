/** Based on 'Simple JavaScript Inheritance' By John Resig (http://ejohn.org/blog/simple-javascript-inheritance/),
 * which is also Inspired by base2 and Prototype
 * MIT Licensed.
 */

angular
    .module('asb.model.entity', ['asb.model.constraints'])
    .service('Entity', ['asbConstraints', function (asbConstraints) {
        (function () {
            var initializing = false, fnTest = /xyz/.test(function () {
                xyz;
            }) ? /\b_super\b/ : /.*/;

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
            }


            var validTypes = {
                'INT': 'INTEGER',
                'BOOLEAN': 'INTEGER',
                'DATE': 'INTEGER',
                'DATETIME': 'INTEGER',
                'FLOAT': 'REAL',
                'TEXT': 'TEXT'
            };

            // The base Class implementation (does nothing)
            this.Entity = function () {
            };

            // Create a new Class that inherits from this class
            Entity.extend = function (prop) {
                if (typeof prop === 'undefined' || typeof prop.attributes === 'undefined' || isEmptyObject(prop.attributes)) {
                    throw 'You must provide some initial data';
                }

                var _super = this.prototype;

                // Instantiate a base class (but only create the instance,
                // don't run the init constructor)
                initializing = true;
                var prototype = new this();
                initializing = false;


                // Copy the properties over onto the new prototype
                for (var name in prop) {
                    if (name !== 'attributes') {
                        // Check if we're overwriting an existing function
                        prototype[name] = typeof prop[name] == "function" &&
                            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                            (function (name, fn) {
                                return function () {
                                    var tmp = this._super;

                                    // Add a new ._super() method that is the same method
                                    // but on the super-class
                                    this._super = _super[name];

                                    // The method only need to be bound temporarily, so we
                                    // remove it when we're done executing
                                    var ret = fn.apply(this, arguments);
                                    this._super = tmp;

                                    return ret;
                                };
                            })(name, prop[name]) : prop[name];
                    }
                }

                // The dummy class constructor
                function Entity() {
                    // All construction is actually done in the init method
                    if (!initializing && this.init)
                        this.init.apply(this, arguments);
                }

                Entity._attributes = prop.attributes;

                prototype._values = {};
                prototype.isValid = function () {
                    for (var i in this._values) {
                        if (!this._values[i].valid) {
                            return false;
                        }
                    }

                    return true;
                };


                prototype._dirtyValues = {};
                prototype.isDirty = function () {
                    return isEmptyObject(this.dirtyValues);
                };

                prototype._new = true;
                prototype.isNew = function () {
                    return this._new;
                };

                for (var attribute in Entity._attributes) {
                    if (!Entity._attributes[attribute].type) {
                        throw 'Must provide a type for attribute ' + attribute;
                    }

                    if (!validTypes.hasOwnProperty(Entity._attributes[attribute].type.toUpperCase())) {
                        throw Entity._attributes[attribute].type + ' is not a valid type';
                    }

                    prototype.__defineGetter__(attribute, function () {
                        return this._values[attribute].value;
                    });

                    prototype.__defineSetter__(attribute, function (value) {
                        if (!Entity._attributes.hasOwnProperty(attribute)) {
                            console.log('Unknown property \'' + attribute + '\'')
                            //throw 'Unknown property \'' + attribute + '\'';
                        }

                        if (this._values[attribute] !== value) {

                            this._values[attribute] = {
                                value: value,
                                valid: true,
                                validationErorrs: []
                            };

                            var constraints = Entity._attributes[attribute].constraints;

                            if (!isEmptyObject(constraints)) {
                                for (var i in constraints) {
                                    console.log('calling', i);
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

                    prototype[attribute] = Entity._attributes[attribute].default ? Entity._attributes[attribute].default : null;
                }

                Entity.prototype.validate = function (attribute) {
                    if (typeof attribute === 'undefined') {
                        for (var i in Entity._attributes) {
                            this.validate(i);
                        }
                    }

                    if (!this._values.hasOwnProperty(attribute)) {
                        throw 'Property ' + attribute + ' does not exist';
                    }
                };

                // Populate our constructed prototype object
                Entity.prototype = prototype;

                // Enforce the constructor to be what we expect
                Entity.prototype.constructor = Entity;

                // And make this class extendable
                Entity.extend = arguments.callee;

                return Entity;
            };
        })();

        return Entity;
    }]);