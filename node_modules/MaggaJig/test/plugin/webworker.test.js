// Jig for test:

var Jig = require('./../../src/jig.js');
var WebWorker = require('./../../plugins/webworker');
/**
 * In case we want to send some information from the worker to the outside, include
 * a postMessage(result) to be ran by init.
 */
var TestJig = Jig.create({
    defaults: {
        text: function () {
            // console.log('I run in the worker');
            console.log('text function from defaults');
        }
    },
    plugins: {
        webWorker: WebWorker
    },
    init: function () {
        console.log('Called on creation');
    }
}, {
    init: function () {
        console.log('Called on instantiation by worker');
        var obj = {};
        obj.sum = this.defaults.sum();
        obj.destroy = true;
        postMessage(obj);
        if (this.defaults.windowCall) {
            try {
                this.defaults.windowCall();
            } catch (err) {
                console.log('All fn calling window should throw a->', err);
            }
        }

    }
});

// Test

describe.only('WebWorker:', function () {
    it('runs jig in worker', function () {
        var instance1 = new TestJig({
            num1: 2,
            num2: 4,
            sum: function () {
                return this.num1 + this.num2;
            },
            onmessage: function (e) {
                console.log('worker said: ', e.data.sum);
                if (e.data.destroy === true) {
                    this.destroy();
                }
            }
        });
        // overwrite onmessage.
        instance1.worker.onmessage = function (e) {
            console.log(e.data.sum * 5);
            if (e.data.destroy === true) {
                this.destroy();
            }
        };
        // terminate worker from outside

        // instance1.worker.destroy();
    });
    it('can not access to global variables such as window', function () {
       /* var instance2 = new TestJig({windowCall: function () {
            var a = window.Date();
            if (!a) {
                console.log(a);
            }
        }});*/
    });
});
