var Magga = require("Magga").getInstance();

module.exports = {
	submitItem: function(item){
		Magga.Mediator.publish("changeItem.JigTodoEdit", {
				item: item
		});
	},
	changeRoute: function(route){
			Magga.Mediator.publish("changeRoute", {
				route: route
			});
	}
}