var Magga = require("magga").getInstance();

module.exports = {

	clickTodoItem: function(item){
			Magga.Mediator.publish("clicked.TodoItem.event", item);
	}
//	changeRoute: function(route){
//			Magga.Mediator.publish("changeRoute", {
//				route: route
//			});
//	}
};
