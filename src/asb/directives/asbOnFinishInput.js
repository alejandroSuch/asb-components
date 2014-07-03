'use strict';

angular
    .module('asb.directives.onfinishinput', [])
    .directive('asbOnFinishInput', function ($timeout, $parse) {
        return {
            restrict: 'A',
            compile: function (element, attrs) {
                var typingDelay = 500;
                var timeoutFn = null;

                if (attrs.asbTypingTimeout || angular.isNumber(attrs.asbTypingDelay)) {
                    typingDelay = parseInt(attrs.asbTypingDelay);
                }

                return function (scope, element, attrs) {
                    if (timeoutFn) {
                        $timeout.cancel(timeoutFn);
                    }

                    timeoutFn = $timeout(function () {
                        scope.$apply(function () {
                            scope.$eval(attrs.asbOnFinishInput());
                        });
                    }, typingDelay);
                };
            }
        }
    });