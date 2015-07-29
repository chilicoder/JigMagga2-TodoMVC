var Magga = require("Magga").getInstance();

module.exports = {

	clickTodoItem: function(item){
			Magga.Mediator.publish("clickTodoItem.JigTodoList", {
				item: item
			});
	},
	changeRoute: function(route){
			Magga.Mediator.publish("changeRoute", {
				route: route
			});
	}
}