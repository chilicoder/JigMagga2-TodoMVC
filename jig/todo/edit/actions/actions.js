var Magga = require("magga").getInstance();

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