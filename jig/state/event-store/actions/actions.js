var Magga = require("magga").getInstance();

module.exports = {
    executeCommand: function(data) {
        Magga.Mediator.publish('executeCommand.EventStore.action',data);
    },
    executeQuery: function(data) {
        Magga.Mediator.publish('executeQuery.EventStore.action',data);
    }

};