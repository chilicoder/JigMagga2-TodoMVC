var Magga = require("magga").getInstance();

module.exports = {
    createEntity: function(data) {
        Magga.Mediator.publish('createEntity.Store.action',data);
    }
};