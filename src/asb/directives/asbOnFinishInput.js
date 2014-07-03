'use strict';

angular
    .module('asb.directives.onFinishInput', [])
    .directive('asbOnFinishInput', function ($timeout, $parse) {
        return {
            restrict: 'A',
            compile: function (element, attrs) {
                var fn = $parse(attrs.asbOnFinishInput());
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
                            fn(scope, {$event: event});
                        });
                    }, typingDelay);
                };
            }
        }
    });