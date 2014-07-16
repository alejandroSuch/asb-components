(function () {
    'use strict';

    angular
        .module('asb.directives.onfinishinput', [])
        .directive('asbOnFinishInput', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var typingTimeout;

                    element.on('keyup', function () {
                        if (typingTimeout) {
                            $timeout.cancel(typingTimeout);
                        }

                        var delay = 1000;
                        /** @namespace attrs.onFinishInputDelay */
                        if (attrs.onFinishInputDelay || angular.isNumber(attrs.onFinishInputDelay)) {
                            delay = attrs.onFinishInputDelay;
                        }

                        typingTimeout = $timeout(function () {
                            /** @namespace attrs.asbOnFinishInput */
                            scope.$eval(attrs.asbOnFinishInput);
                        }, delay);
                    });
                }
            };
        });
})();