var Magga = require("magga").getInstance();

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
};