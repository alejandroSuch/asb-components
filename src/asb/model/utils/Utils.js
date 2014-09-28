angular
    .module('asb.model.utils', [])
    .factory('UUID', function () {
        return {
            createUUID: function () {
                var s = [];
                var hexDigits = "0123456789ABCDEF";
                for (var i = 0; i < 32; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[12] = "4";
                s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);

                var uuid = s.join("");
                return uuid;
            }
        };
    });
