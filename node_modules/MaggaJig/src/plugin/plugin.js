/**
 * This function will execute a hook fn on all plugins of a jig.
 *
 * Example:
 *
 * plugins: {
 *
 *      examplePlugin: {
 *              beforeCreate: function(){},
 *              afterCreate: function(){},
 *              beforeInit: function(){},
 *              afterInit: function(){}
 *      }
 *
 * }
 *
 *
 * @param  {string} hook     Extra functions to be added in the jig.
 * @return {function}         It returns the namespace with the hooks added.
 */


module.exports = function plugin(hook) {
    var i,
        objectKeys;

    if (typeof hook === 'string') {
        if (this.plugins) {
            objectKeys = Object.keys(this.plugins);
            for (i = 0; i < objectKeys.length; i++) {
                if (typeof this.plugins[objectKeys[i]][hook] === 'function') {
                    this.plugins[objectKeys[i]][hook](this, objectKeys[i]);
                }
            }
        }
    }
};
