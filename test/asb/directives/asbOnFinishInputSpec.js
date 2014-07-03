'use strict';

describe('directive: asbOnFinishInput', function () {
    var element;

    beforeEach(angular.module('asb.directives.onFinishInput'));

    beforeEach(inject(function ($rootScope, $compile) {
        element = $compile('<input type="text" ng-model="value" asb-on-finish-input="ofi()" />')($rootScope.$new());
    }));

    it("contains spec with an expectation", function () {
        debugger;//!!
        expect(true).toBe(true)
        console.log(1, expect);
        console.log(2, expect(true));
        console.log(3, expect(true).toBe);
        console.log(4, expect(true).toBe(true));
    });


    /*
     var inputElm, formElm, scope, currentSpec, changeInputValueTo;

     function compileInput(inputHtml, mockValidity) {
     inputElm = angular.element(inputHtml);
     formElm = angular.element('<form name="form"></form>');
     formElm.append(inputElm);
     $compile(formElm)(scope);
     scope.$digest();
     }


     beforeEach(function () {
     currentSpec = this;
     });

     afterEach(function () {
     currentSpec = null;
     });

     beforeEach(module(function ($compileProvider) {
     $compileProvider.directive('attrCapture', function () {
     return function (scope, element, $attrs) {
     var attrs = $attrs;
     };
     });
     }));

     beforeEach(inject(function ($injector, _$sniffer_, _$browser_) {
     $sniffer = _$sniffer_;
     $browser = _$browser_;
     $compile = $injector.get('$compile');
     scope = $injector.get('$rootScope');

     changeInputValueTo = function (value) {
     inputElm.val(value);
     browserTrigger(inputElm, $sniffer.hasEvent('input') ? 'input' : 'change');
     };
     }));

     afterEach(function () {
     dealoc(formElm);
     });

     it('should get called after a second', inject(function ($rootScope, $compile, $timeout) {
     compileInput('<input type="text" ng-model="value" asb-on-finish-input="ofi()" />');

     scope.asbOnFinishInput = jasmine.createSpy('ofi').andCallFake(function () {
     });

     changeInputValueTo('new value');
     $timeout(function () {
     expect(scope.asbOnFinishInput).not.toHaveBeenCalledOnce();
     }, 500);

     $timeout(function () {
     expect(scope.asbOnFinishInput).toHaveBeenCalledOnce();
     }, 1001);
     }));*/
});