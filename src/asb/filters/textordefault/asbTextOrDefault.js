angular.module('asb.filters.textordefault', [])
	.filter('asbTextOrDefault', function(){
		return function(input, defaultValue) {
			defaultValue = defaultValue || '-';

			if(!input) {
				return defaultValue;
			}

			if(!angular.isString()) {
				if(input.toString && input.toString() !== '[object Object]') {
					input = input.toString();
				} else {
					return defaultValue;
				}
			}

			if(input.trim().length > 0) {
				return input;
			}

			return defaultValue;
		};
	});