'use strict';

describe('directive: asbOnFinishInput', function () {
    var element, scope;

    beforeEach(module('asb.directives.onfinishinput'));

    beforeEach(inject(function ($rootScope, $compile, _$sniffer_, _$browser_) {
        console.log('sniffer', _$sniffer_);
        console.log('browser_', _$browser_);
        //return;
        scope = $rootScope.$new();
        element = $compile('<input type="text" ng-model="value" asb-on-finish-input="ofi()" />')(scope);
        //$sniffer = _$sniffer_;
        //$browser = _$browser_;

        element.val('value');
        console.log(element);
        //browserTrigger(inputElm, $sniffer.hasEvent('input') ? 'input' : 'change');
    }));

    it("contains spec with an expectation", function () {

        //debugger;//!!
        expect(true).toBe(true)
        /*console.log(1, expect);
        console.log(2, expect(true));
        console.log(3, expect(true).toBe);
        console.log(4, expect(true).toBe(true));*/
    });
});