/* JavaScript Entity Model
 * By Alejandro Such Berenger
 * MIT Licensed.
 */

// Based on 'Simple JavaScript Inheritance' By John Resig (http://ejohn.org/blog/simple-javascript-inheritance/),
// which is also Inspired by base2 and Prototype

(function () {
    angular
        .module('asb.model.entity', ['asb.model.constraints'])
        .service('Entity', ['asbConstraints', function (asbConstraints) {
            (function () {
                var initializing = false, fnTest = /xyz/.test(function () {
                    xyz;
                }) ? /\b_super\b/ : /.*/;

                var validTypes = {
                    'INT': 'INTEGER',
                    'BOOLEAN': 'INTEGER',
                    'DATE': 'INTEGER',
                    'DATETIME': 'INTEGER',
                    'FLOAT': 'REAL',
                    'TEXT': 'TEXT'
                };

                var reservedAttributeNames = ['id', 'dateCreated', 'lastUpdated'];

                // The base Entity implementation (does nothing)
                this.Entity = function () {
                };

                // Create a new Entity that inherits from this entity
                Entity.extend = function (entityName, prop) {
                    Entity.entityName = entityName;

                    var _super = this.prototype;

                    // Instantiate a base class (but only create the instance,
                    // don't run the init constructor)
                    initializing = true;
                    var prototype = new this();
                    initializing = false;

                    // Copy the properties over onto the new prototype
                    for (var name in prop) {
                        if (name === 'attributes') {
                            continue;
                        }
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
                            })(name, prop[name]) :
                            prop[name];
                    }

                    if (!prototype.attributes) {
                        prototype.attributes = {
                            id: '',
                            dateCreated: new Date(),
                            lastUpdated: new Date()
                        };
                    } else {
                        prototype.attributes = JSON.parse(JSON.stringify(prototype.attributes));
                    }

                    prototype._new = true;
                    prototype.isNew = function () {
                        return prototype._new;
                    };

                    prototype._dirty = false;
                    prototype.isDirty = function () {
                        return prototype._dirty;
                    };

                    prototype._dirtyValues = [];


                    if (!!prop.attributes) {
                        for (var attributeName in prop.attributes) {
                            if (reservedAttributeNames.indexOf(attributeName) !== -1) {
                                throw new Error('ERROR. ' + attributeName + ' is a reserved word');
                            }

                            var defaultValue = !!prop.attributes[attributeName].default ? prop.attributes[attributeName].default : null;

                            prototype.attributes[attributeName] = {
                                value: defaultValue
                            };

                            prototype.__defineGetter__(attributeName, function () {
                                return prototype.attributes[attributeName].value;
                            });

                            prototype.__defineSetter__(attributeName, function (value) {
                                if (prototype.attributes[attributeName].value === value) {
                                    return;
                                }

                                if (prototype._dirtyValues.indexOf(attribute) === -1) {
                                    prototype._dirtyValues.push(attribute);
                                }

                                prototype._dirty = true;
                                prototype.attributes.lastUpdated = new Date();
                                prototype.attributes[attribute].value = value;
                            });
                        }
                    }

                    // The dummy class constructor
                    function Entity() {
                        // All construction is actually done in the init method
                        if (!initializing && this.init)
                            this.init.apply(this, arguments);
                    }

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
})();