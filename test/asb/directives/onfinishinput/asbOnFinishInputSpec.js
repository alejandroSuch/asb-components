'use strict';

describe('directive: asbOnFinishInput', function () {
    var scope, compile, timeout, element;

    beforeEach(function () {
        module('agenda');
        inject(function ($compile, $rootScope, $timeout) {
            scope = $rootScope;
            compile = $compile;
            timeout = $timeout;

            scope.triggerOnFinishInput = function () {
                alert(33);
            };

            scope.model = { value: null };

            element = angular.element('<input type="text" ng-model="model.value" asb-on-finish-input="triggerOnFinishInput()" />');
            element = compile(element)(scope);

            spyOn(scope, "triggerOnFinishInput");
        });
    });

    it('should not be called', function () {
        element.val('newValue')
        timeout.flush(100);
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(1500);
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
    });

    it('shouldnt not be called after 1000ms (default)', function () {
        element.val('newValue')
        element.triggerHandler('keyup');
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(100);
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(900);
        expect(scope.triggerOnFinishInput).toHaveBeenCalled();
    });

    it('shouldnt not be called after 1000ms (default delay)', function () {
        element.val('newValue')
        element.triggerHandler('keyup');
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(100);
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(900);
        expect(scope.triggerOnFinishInput).toHaveBeenCalled();
    });

    it('shouldnt not be called after 1500ms because a retype (default delay)', function () {
        element.val('newValue')
        element.triggerHandler('keyup');
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();

        timeout.flush(500);
        element.val('anotherNewValue')
        element.triggerHandler('keyup');
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(500);
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(500);
        expect(scope.triggerOnFinishInput).toHaveBeenCalled();
    });

    it('shouldnt not be called after 200ms (given delay)', function () {
        element = angular.element('<input type="text" ng-model="model.value" asb-on-finish-input="triggerOnFinishInput()" on-finish-input-delay="200" />');
        element = compile(element)(scope);

        element.val('newValue')
        element.triggerHandler('keyup');
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(100);
        expect(scope.triggerOnFinishInput).not.toHaveBeenCalled();
        timeout.flush(100);
        expect(scope.triggerOnFinishInput).toHaveBeenCalled();
    });
});