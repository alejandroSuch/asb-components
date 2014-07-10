//TODO: create default error messages

'use strict';
(function () {
    angular
        .module('asb.model.constraints')
        .provider('asbConstraints', function () {
            var instance = {
                /**
                 * Validates that a String value is not blank
                 * @param value
                 * @param blank
                 * @returns {boolean}
                 */
                blank: function (value, blank) {
                    if (typeof value !== 'undefined' && value !== null && typeof value !== 'string' && !(value instanceof String)) {
                        throw 'Blank constraint only applies to strings';
                    }

                    var isBlank = typeof value === 'undefined' || value === null || value.length === 0 || !value.trim();

                    if (!blank) {
                        return !isBlank;
                    }

                    return true;
                },

                /**
                 * Validates that a String value is a valid credit card number
                 * @param value
                 * @param creditCard
                 * @returns {boolean}
                 */
                creditCard: function (value, creditCard) {
                    throw 'CreditCard constraint: Not implemented yet';
                    return false;
                },

                /**
                 * Validates that a String value is a valid email address.
                 * @param value
                 * @param email
                 * @returns {boolean}
                 */
                email: function (value, email) {
                    var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

                    if (email) {
                        return emailRegex.test(value);
                    }

                    return true;
                },

                /**
                 * Validates that a value is within a range or collection of constrained values.
                 * @param value
                 * @param array
                 * @returns {boolean}
                 */
                inList: function (value, array) {
                    if (!(value instanceof Array)) {
                        throw 'InList constraint only applies to Arrays';
                    }

                    return array.indexOf(value) !== -1;
                },

                /**
                 * Validates that a String value matches a given regular expression.
                 * @param value
                 * @param expr
                 * @returns {boolean}
                 */
                matches: function (value, expr) {
                    if (typeof value !== 'string' && !(value instanceof String)) {
                        throw 'Matches constraint only applies to Strings';
                    }

                    var regexp = new RegExp(expr);

                    return regexp.test(value);
                },

                /**
                 * Validates that a value does not exceed the given maximum value.
                 * @param value
                 * @param max
                 * @returns {boolean}
                 */
                max: function (value, max) {
                    return value <= max;
                },

                /**
                 * Validates that a value's size does not exceed the given maximum value.
                 * @param value
                 * @param maxSize
                 * @returns {boolean}
                 */
                maxSize: function (value, maxSize) {
                    if (value instanceof Array || value instanceof String || typeof value === 'string') {
                        return value.length <= maxSize;
                    }

                    throw 'MinSize constraint only applies to Arrays and Strings';
                },

                /**
                 * Validates that a value does not fall below the given minimum value.
                 * @param value
                 * @param min
                 * @returns {boolean}
                 */
                min: function (value, min) {
                    return value >= min;
                },

                /**
                 * Validates that a value's size does not fall below the given minimum value.
                 * @param value
                 * @param minSize
                 * @returns {boolean}
                 */
                minSize: function (value, minSize) {
                    if (value instanceof Array || value instanceof String || typeof value === 'string') {
                        return value.length >= minSize;
                    }

                    throw 'MinSize constraint only applies to Arrays and Strings';
                },

                /**
                 * Validates that that a property is not equal to the specified value
                 * @param value
                 * @param otherValue
                 * @returns {boolean}
                 */
                notEqual: function (value, otherValue) {
                    return value !== otherValue;
                },

                /**
                 * Allows a property to be set to null - defaults to true.
                 * @param value
                 * @param nullable
                 * @returns {boolean}
                 */
                nullable: function (value, nullable) {
                    if (arguments.length !== 2) {
                        throw 'Constraint error. Must provide a boolean value for nullable';
                    }

                    if (!nullable) {
                        return value !== null;
                    }

                    return true;
                },

                /**
                 * Ensures that a property's value occurs within a specified range
                 * @param value
                 * @param start
                 * @param end
                 * @returns {boolean}
                 */
                range: function (value, start, end) {
                    return value >= Math.min(start, end) && value <= Math.max(start, end);
                },

                /**
                 * Restricts the size of a collection or the length of a String.
                 * @param value
                 * @param start
                 * @param end
                 * @returns {boolean}
                 */
                size: function (value, start, end) {
                    if (value instanceof Array || value instanceof String || typeof value === 'string') {
                        return value.length >= Math.min(start, end) && value.length <= Math.max(start, end);
                    }

                    throw 'Size constraint only applies to Arrays and Strings';
                },

                /**
                 * Constrains a property as unique at the database level
                 * @param value
                 * @param unique
                 * @returns {boolean}
                 */
                unique: function (value, unique) {
                    throw 'Unique constraint: not implemented yet';

                    return false;
                },

                /**
                 * Validates that a String value is a valid URL.
                 * @param value
                 * @param url
                 * @returns {boolean}
                 */
                url: function (value, url) {
                    var urlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

                    if (url) {
                        return urlRegex.test(value);
                    }

                    return true;
                }
            };

            var defaultConstraints = [];
            for (var i in instance) {
                defaultConstraints.push(i);
            }

            this.addConstraint = function (constraintName, fn) {
                if (defaultConstraints.indexOf(constraintName) !== 1) {
                    throw 'Cannot override a default constraint';
                }

                instance[constraintName] = fn;
            };

            this.setErrorMessage = function(constraintName, message){
                instance[constraintName + 'Message'] = message;
            };

            this.$get = function () {
                return instance;
            };
        });
})();