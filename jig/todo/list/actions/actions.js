var Magga = require("magga").getInstance();


module.exports = {

	clickTodoItem: function(item){
		Magga.Mediator.publish("clicked.TodoItem.event", item);
	},
	clickAddItem: function(item){
		Magga.Mediator.publish("create.TodoItem.action", item);
	},
	createItem: function(item){
		value = item.description || 'New Item';
		Magga.Mediator.publish('executeCommand.EventStore.action',{
			command:'create.Todo',
			cb: function(aggregateId){
				Magga.Mediator.publish('executeCommand.EventStore.action',{
					command:'changeDescription.Todo',
					params:{
						id:aggregateId,
						description: value
					}
				});
			}
		});
	},
	submitItem: function(item) {
		Magga.Mediator.publish('executeCommand.EventStore.action',{
			command:'changeDescription.Todo',
			params:{
				id:item.id,
				description:item.value
			}
		});
	},
	toggleItem: function(item){
		var command = '',
			status = item.status;
		if (status === 'undone') {
			command = 'complete.Todo'
		}

		if (status === 'done') {
			command = 'reactivate.Todo'
		}
		if (command !== '') {
			Magga.Mediator.publish('executeCommand.EventStore.action',{
				command:command,
				params:{
					id:item.id
				}
			});
		}
	},
	deleteItem: function(item) {
		Magga.Mediator.publish('executeCommand.EventStore.action',{
			command: 'delete.Todo',
			params:{
				id:item.id
			}
		});
	}
//	changeRoute: function(route){
//			Magga.Mediator.publish("changeRoute", {
//				route: route
//			});
//	}
};
