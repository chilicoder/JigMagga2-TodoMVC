var Magga = require("magga").getInstance();

module.exports = {

	clickTodoItem: function(item){
		Magga.Mediator.publish("clicked.TodoItem.event", item);
	},
	clickAddItem: function(item){
		Magga.Mediator.publish("create.TodoItem.action", item);
	}
//	changeRoute: function(route){
//			Magga.Mediator.publish("changeRoute", {
//				route: route
//			});
//	}
};
