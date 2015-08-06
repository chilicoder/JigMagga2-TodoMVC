var Magga = require("magga").getInstance();

module.exports = {
	submitItem: function(item){
		Magga.Mediator.publish("submit.ItemView.action", item);
	},
	deleteItem: function(item){
		Magga.Mediator.publish("delete.ItemView.action", item);
	}
};