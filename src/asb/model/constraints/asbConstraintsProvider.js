//TODO: create default error messages

'use strict';
(function () {
    angular
        .module('asb.model.constraints', [])
        .provider('asbConstraints', function () {
            var instance = {};
            /**
             * Validates that a String value is not blank
             * @param value
             * @param blank
             * @returns {boolean}
             */
            instance.blank = function (value, blank) {
                if (typeof value !== 'undefined' && value !== null && typeof value !== 'string' && !(value instanceof String)) {
                    throw 'Blank constraint only applies to strings';
                }

                var isBlank = typeof value === 'undefined' || value === null || value.length === 0 || !value.trim();

                if (!blank) {
                    return !isBlank;
                }

                return true;
            };

            /**
             * Validates that a String value is a valid credit card number
             * @param value
             * @param creditCard
             * @returns {boolean}
             */
            instance.creditCard = function (value, creditCard) {
                throw 'CreditCard constraint: Not implemented yet';

                return false;
            };

            /**
             * Validates that a String value is a valid email address.
             * @param value
             * @param email
             * @returns {boolean}
             */
            instance.email = function (value, email) {
                var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

                if (email) {
                    return emailRegex.test(value);
                }

                return true;
            };

            /**
             * Validates that a value is within a range or collection of constrained values.
             * @param value
             * @param array
             * @returns {boolean}
             */
            instance.inList = function (value, array) {
                if (!(array instanceof Array)) {
                    throw 'InList constraint only applies to Arrays';
                }

                return array.indexOf(value) !== -1;
            };

            /**
             * Validates that a String value matches a given regular expression.
             * @param value
             * @param expr
             * @returns {boolean}
             */
            instance.matches = function (value, expr) {
                if (typeof value !== 'string' && !(value instanceof String)) {
                    throw 'Matches constraint only applies to Strings';
                }

                var regexp = new RegExp(expr);

                return regexp.test(value);
            };

            /**
             * Validates that a value does not exceed the given maximum value.
             * @param value
             * @param max
             * @returns {boolean}
             */
            instance.max = function (value, max) {
                if (typeof value !== 'number' && !(value instanceof Number)) {
                    throw 'Max constraint only applies to numbers';
                }

                return value <= max;
            };

            /**
             * Validates that a value's size does not exceed the given maximum value.
             * @param value
             * @param maxSize
             * @returns {boolean}
             */
            instance.maxSize = function (value, maxSize) {
                if (value instanceof Array || value instanceof String || typeof value === 'string') {
                    return value.length <= maxSize;
                }

                if (typeof maxSize !== 'number' && !(maxSize instanceof Number)) {
                    throw 'Argument maxSize should be a number';
                }

                throw 'MaxSize constraint only applies to Arrays and Strings';
            };

            /**
             * Validates that a value does not fall below the given minimum value.
             * @param value
             * @param min
             * @returns {boolean}
             */
            instance.min = function (value, min) {
                if (typeof value !== 'number' && !(value instanceof Number)) {
                    throw 'Min constraint only applies to numbers';
                }

                return value >= min;
            };

            /**
             * Validates that a value's size does not fall below the given minimum value.
             * @param value
             * @param minSize
             * @returns {boolean}
             */
            instance.minSize = function (value, minSize) {
                if (value instanceof Array || value instanceof String || typeof value === 'string') {
                    return value.length >= minSize;
                }

                if (typeof minSize !== 'number' && !(minSize instanceof Number)) {
                    throw 'Argument minSize should be a number';
                }

                throw 'MinSize constraint only applies to Arrays and Strings';
            };

            /**
             * Validates that that a property is not equal to the specified value
             * @param value
             * @param otherValue
             * @returns {boolean}
             */
            instance.notEqual = function (value, otherValue) {
                throw 'NotEqual constraint: Not implemented yet';

                return value !== otherValue;
            };

            /**
             * Allows a property to be set to null - defaults to true. Undefined is considered null in this constraint
             * @param value
             * @param nullable
             * @returns {boolean}
             */
            instance.nullable = function (value, nullable) {
                if (arguments.length !== 2) {
                    throw 'Constraint error. Must provide a boolean value for nullable';
                }

                if (!nullable) {
                    return value !== null && typeof value !== 'undefined';
                }

                return true;
            };

            /**
             * Ensures that the given value should be numeric
             * @param value
             * @param numeric
             */
            instance.numeric = function (value, numeric) {
                if (arguments.length !== 2) {
                    throw 'Numeric constraint expects two arguments';
                }

                var isNumeric = typeof value === 'number' || value instanceof Number;

                if (numeric) {
                    return isNumeric;
                }

                return true;
            };

            /**
             * Ensures that a property's value occurs within a specified range
             * @param value
             * @param start
             * @param end
             * @returns {boolean}
             */
            instance.range = function (value, start, end) {
                if (arguments.length !== 3) {
                    throw 'Range constraint expects three arguments';
                }

                if (!instance.numeric(value, true) || !instance.numeric(start, true) || !instance.numeric(end, true)) {
                    throw 'All three values must be numbers';
                }

                return value >= Math.min(start, end) && value <= Math.max(start, end);
            };

            /**
             * Restricts the size of a collection or the length of a String.
             * @param value
             * @param start
             * @param end
             * @returns {boolean}
             */
            instance.size = function (value, start, end) {
                if (arguments.length !== 3) {
                    throw 'Size constraint expects three arguments';
                }

                if (!instance.numeric(start, true) || !instance.numeric(end, true)) {
                    throw 'Start and end values must be numbers';
                }

                if (value instanceof Array || value instanceof String || typeof value === 'string') {
                    return value.length >= Math.min(start, end) && value.length <= Math.max(start, end);
                }

                throw 'Size constraint only applies to Arrays and Strings';
            };

            /**
             * Constrains a property as unique at the database level
             * @param value
             * @param unique
             * @returns {boolean}
             */
            instance.unique = function (value, unique) {
                throw 'Unique constraint: not implemented yet';

                return false;
            };

            /**
             * Validates that a String value is a valid URL.
             * @param value
             * @param url
             * @returns {boolean}
             */
            instance.url = function (value, url) {
                if(arguments.length !== 2) {
                    throw 'Url constraint: expected 2 arguments';
                }

                if(typeof value !== 'string' && !(value instanceof String)) {
                    throw 'Url constraint: value expected to be a string';
                }

                if(typeof url !== 'boolean' && !(url instanceof Boolean)) {
                    throw 'Url constraint: url expected to be a boolean';
                }

                var urlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

                if (url) {
                    return urlRegex.test(value);
                }

                return true;
            };

            var defaultConstraints = [];
            for (var i in instance) {
                defaultConstraints.push(i);
            }

            this.addConstraint = function (constraintName, fn) {
                if (defaultConstraints.indexOf(constraintName) !== -1) {
                    throw 'Cannot override a default constraint';
                }

                instance[constraintName] = fn;
            };

            this.setErrorMessage = function (constraintName, message) {
                instance[constraintName + 'Message'] = message;
            };

            this.$get = function () {
                return instance;
            };
        });
})();