/**
 *
 * @param defaults
 * @returns {object}
 * @constructor
 */
function Jig() {

}

/**
 * [create description]
 * @type {[type]}
 */
Jig.create = require('./create/create.js');


/**
 * [create description]
 * @type {[type]}
 */
Jig.setup = require('./setup/setup.js');

/**
 * [create description]
 * @type {[type]}
 */
Jig.init = require('./init/init.js');

/** @type {[type]} [description] */
Jig.plugin = require('./plugin/plugin.js');



// ***** Prototype ******


/** @type {[type]} [description] */
Jig.prototype.plugin = require('./plugin/plugin.js');

/**
 *
 */
Jig.prototype.setup = require('./setup/setup.js');

/**
 *
 */
Jig.prototype.init = require('./init/init.js');



module.exports = Jig;
