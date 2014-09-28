/* JavaScript Entity Model
 * By Alejandro Such Berenger
 * MIT Licensed.
 */

// Based on 'Simple JavaScript Inheritance' By John Resig (http://ejohn.org/blog/simple-javascript-inheritance/),
// which is also Inspired by base2 and Prototype

(function () {
    angular
        .module('asb.model.entity', ['asb.model.constraints', 'asb.model.utils'])
        .service('Entity', ['asbConstraints', 'UUID', function (asbConstraints, UUID) {
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
                    var _super = this.prototype;

                    // Instantiate a base class (but only create the instance,
                    // don't run the init constructor)
                    initializing = true;
                    var prototype = new this();
                    initializing = false;

                    // Copy the properties over onto the new prototype
                    if(!!prop) {
                        for (var name in prop) {
                            if (['attributes', 'equals'].indexOf(name) !== -1) {
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

                        //TODO: EQUALS FUNCTION
                    }

                    if (!prototype._meta) {
                        prototype._meta = {};

                        ['id', 'dateCreated', 'lastUpdated'].forEach(function (it) {
                            prototype.__defineSetter__(it, function (value) {
                                throw new Error('Can\'t set value manually');
                            });

                            prototype.__defineGetter__(it, function () {
                                return this._values[it].value;
                            });
                        });

                        prototype.isNew = function () {
                            return this._new;
                        };

                        prototype.isDirty = function () {
                            return this._dirtyValues.length !== 0;
                        };
                    } else {
                        var metaCopy = prototype._meta;
                        prototype._meta = {};

                        for(var metaAttr in metaCopy) {
                            prototype._meta[metaAttr] = metaCopy[metaAttr];
                        }
                    }

                    prototype.__defineGetter__('entityName', function(){
                        return entityName;
                    });

                    prototype.__defineSetter__('entityName', function(value){
                        throw new Error('Read-only property');
                    });

                    if (!!prop.attributes) {
                        for (var attributeName in prop.attributes) {
                            if (reservedAttributeNames.indexOf(attributeName) !== -1) { //NOT A RESERVED WORD
                                throw new Error('ERROR. "' + attributeName + '" is a reserved word');
                            }

                            if (!!prototype._meta[attributeName]) { //NOT AN EXISTING ATTRIBUTE
                                throw new Error('Property "' + attributeName + '" already exists');
                            }

                            prototype._meta[attributeName] = prop.attributes[attributeName]; //COPY ATTRIBUTE TO META

                            prototype.__defineGetter__(attributeName, function () { //GENERATE GETTER
                                debugger
                                return this._values[attributeName].value;
                            });

                            prototype.__defineSetter__(attributeName, function (value) { //GENERATE SETTER
                                if (this._values[attributeName].value === value) {
                                    return;
                                }

                                if (this._dirtyValues.indexOf(attributeName) === -1) {
                                    this._dirtyValues.push(attributeName);
                                }

                                this._values.lastUpdated.value = new Date();
                                this._values[attributeName].value = value;

                                //TODO: Check validity
                            });
                        }
                    }

                    // The dummy class constructor
                    function Entity() {
                        this._new = true;
                        this._dirtyValues = [];

                        this._values = {
                            id: {
                                value: UUID.createUUID()
                            },
                            dateCreated: {
                                value: new Date()
                            },
                            lastUpdated: {
                                value: new Date()
                            }
                        };

                        for (attributeName in prototype._meta) { //SET DEFAULT VALUES FROM ANCESTORS
                            if(!prop.attributes || (!!prop.attributes && !prop.attributes[attributeName])) {
                                this._values[attributeName] = {
                                    value: prototype._meta[attributeName].default ? prototype._meta[attributeName].default : null
                                };
                            }
                        }

                        if (!!prop.attributes) { //SET DEFAULT VALUES FROM CURRENT ENTITY
                            for (attributeName in prop.attributes) {
                                this._values[attributeName] = { //SET DEFAULT VALUE
                                    value: !!prop.attributes[attributeName].default ? prop.attributes[attributeName].default : null
                                };
                            }
                        }

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