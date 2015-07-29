
/**
 * creates inline worker containing jig. Overwrites jig's constructor
 * to only start worker, which then creates instance of jig and avoid creation
 * of jig instances outside of the worker.
 *
 */
var webWorker = {
    // copy jig's constructor to use in beforeInit.
    afterCreate: function (self) {
        self.defaults._konstruktor = self;
    },
    beforeInit: function (self) {
        // copy jig as object and run new jig.constructor in workerHandler
        // Extension of defaults and plugins already done in main thread.
        var workerHandler = 'onmessage = function(e){\njig = ' + obj2Str(self, true) +
                '\nnew ' + self.defaults._konstruktor.toString().replace('this.defaults =' +
                    ' extend(this.defaults, defaults);', '').replace('this.plugins = ' +
                    'extend(this.plugins, plugins);', '').replace(/this/g, 'jig') + '();\n}',
            blobURL = new Blob([workerHandler]),
            // Obtain a blob URL reference to our worker handler.
            worker = new Worker(window.URL.createObjectURL(blobURL));

        // In case there is a handler for the worker's data, use it.
        worker.onmessage = self.defaults.onmessage ? self.defaults.onmessage : function () {};

        // TODO Find a way to destroy the worker
        worker.destroy = function () {
            console.log(this.blobURL);
            window.URL.revokeObjectURL(this.blobURL);
            console.log(this.blobURL);
        };

        // overwrite setup to break main thread's constructor.
        self.setup = function () {
            return false;
        };
        // associate worker with jig to access to worker from outside.
        self.worker = worker;
        // associate worker's blobURL in order to (be able to) revoke it from outside.
        self.worker.blobURL = blobURL;
        // start worker, that will run workerHandler, and instantiate the jig
        worker.postMessage('worker on');
    }
};

function obj2Str(obj) {
    var string = [],
        property;

    //    is object
    if (typeof obj === 'object' && (obj.join === undefined)) {
        string.push('{');
        for (property in obj) {
            if (property !== 'beforeInit') {
                string.push('\n', property, ' : ', obj2Str(obj[property]), ',\n');
            }
        }
        string.push('}');

        // is array
    } else if (typeof obj === 'object' && !(obj.join === undefined)) {
        string.push('[');
        for(property in obj) {
            string.push(obj2Str(obj[property]), ',');
        }
        string.push(']');

        // is function
    } else if (typeof obj === 'function') {
        string.push(obj.toString());

        // all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj));
    }

    return string.join('');
}

module.exports = webWorker;
