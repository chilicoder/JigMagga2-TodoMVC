(function () {
    var Jig = require("./jig.js");
 
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Jig;
        });
    }
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Jig;
    }
    else {
        this.Jig = Jig;
    }
}.call(this));