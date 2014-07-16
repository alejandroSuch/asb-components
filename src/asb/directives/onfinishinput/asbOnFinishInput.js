'use strict';

angular
    .module('asb.directives.onfinishinput', [])
    .directive('asbOnFinishInput', function ($timeout, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var typingTimeout;

                element.on('keyup', function () {
                    if (typingTimeout) {
                        $timeout.cancel(typingTimeout);
                    }

                    var delay = 500;
                    /** @namespace attrs.onFinishInputDelay */
                    if (attrs.onFinishInputDelay || angular.isNumber(attrs.onFinishInputDelay)) {
                        delay = attrs.onFinishInputDelay;
                    }

                    typingTimeout = $timeout(function () {
                        /** @namespace attrs.onFinishInput */
                        scope.$eval(attrs.onFinishInput);
                    }, delay);
                });
            }
        };
    });