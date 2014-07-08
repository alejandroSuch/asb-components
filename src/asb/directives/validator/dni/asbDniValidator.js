'use strict';

(function () {
    var packageName = 'asb.directives.validator.dni';
    var directiveName = 'asbDniValidator';
    var ngModelController = null;

    angular
        .module(packageName, [])
        .directive(directiveName, function () {
            var isNif = function (value) { // http://donnierock.com/2011/11/05/validar-un-dni-con-javascript/
                var dniRegex = /^\d{8}[a-zA-Z]$/;

                if (dniRegex.test(value) === true) {
                    var dniNumber = value.substr(0, value.length - 1) % 23;
                    var lastChar = value.substr(value.length - 1, 1).toUpperCase();
                    var calculatedChar = 'TRWAGMYFPDXBNJZSQVHLCKET'.substring(dniNumber, dniNumber + 1);

                    if (calculatedChar != lastChar) {
                        ngModelController.$setValidity(directiveName, false);
                    } else {
                        ngModelController.$setValidity(directiveName, true);
                    }
                } else {
                    ngModelController.$setValidity(directiveName, false);
                }

                return value;
            };

            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attrs, ctrl) {
                    ngModelController = ctrl;
                    ngModelController.$parsers.push(isNif);
                    ngModelController.$formatters.unshift(isNif);
                }
            }
        });
})();