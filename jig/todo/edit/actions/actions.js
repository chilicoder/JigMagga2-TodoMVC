var Magga = require("magga").getInstance();

module.exports = {
	submitItem: function(item){
		Magga.Mediator.publish("submit.ItemView.action", item);
	},
//	deleteItem: function(item){
//		Magga.Mediator.publish("delete.Item.event", {
//			item: item
//		});
//	},
	changeRoute: function(route){
			Magga.Mediator.publish("change.Route.action", {
				route: route
			});
	}
};