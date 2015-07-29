/**
 * Creates a namespace for a jig with statics as static methods,
 * and proto as prototype methods.
 * @param  {string} namespace - name of the existing/or to be created namespace.
 * @param  {object} statics - object with static methods
 * @param  {object} proto - object with prototype functions.
 * @return {function} jig   - jig prototype
 * Arguments can be ("namespace", {}, {},),
 *              or ("namespace", {}) -> Object is proto
 *              or ({}) -> proto
 *              or ({},{}) -> statics and proto.
 *    "namespace" can be a concatenation of strings (deep namespace)
 **/


module.exports = function create(namespace, statics, proto) {
    var jig,
        namespaces,
        i,
        len,
        tempGlobal = global || window;

    // Find out which arguments are given
    if (typeof proto === 'undefined') {
        // Arguments are ("namespace", {}), or ({},{})
        if (typeof statics !== 'undefined') {
            proto = statics;
            statics = typeof namespace === 'string' ? null : namespace;
            // Argument is ({})
        } else {
            proto = namespace;
        }
    }

    // create Jig constructor
    jig = function (defaults, plugins) {
        this.defaults = extend(this.defaults, defaults);
        this.plugins = extend(this.plugins, plugins);
        this.plugin('beforeInit');
        if (this.setup() === false) {
            return;
        }
        this.init();
        this.plugin('afterInit');
    };

    // Arguments are ("namespace", {}, {},)
    if (typeof namespace === 'string') {
        namespaces = namespace.split('.');
        // For every str in namespace, check if it is already a namespace
        // in global. If not, create it, and assign last one to jig
        for (i = 0, len = namespaces.length - 1; i < len; i++) {
            if (!tempGlobal[namespaces[i]]) {
                tempGlobal[namespaces[i]] = {};
            }
            tempGlobal = tempGlobal[namespaces[i]];
        }
        tempGlobal[namespaces[namespaces.length - 1]] = jig;
    }


    // inherit from parent Jig and add static methods to jig
    extend(jig, this);
    extend(jig, statics);
    jig.plugin("beforeCreate");

    // inheritance prototype
    jig.prototype = Object.create(this.prototype);
    extend(jig.prototype, proto);
    // super prototype
    jig.prototype._super = this;

    // make sure there is a plugins, defaults object, and static init function
    jig.prototype.plugins   = jig.plugins   = jig.plugins || {};
    jig.prototype.defaults  = jig.defaults  = jig.defaults || {};


    jig.setup();
    jig.init();
    jig.plugin("afterCreate");

    return jig;
};


/**
 * Extend helper
 * @param origin
 * @param add
 * @returns {*}
 */
function extend(origin, add) {
    var keys,
        z;
    // Do nothing if add is undefined
    if (!add) {
        return origin;
    }
    origin = origin || {};
    keys = Object.keys(add);
    z = keys.length;
    while (z--) {
        origin[keys[z]] = add[keys[z]];
    }
    return origin;
}