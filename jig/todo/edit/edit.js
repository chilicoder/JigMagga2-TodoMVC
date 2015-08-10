var Jig = require("magga-jig"),
	Magga = require("magga").getInstance(),
	ReactPlugin = require("magga-jig/plugins/react"),
	EventsPlugin = require("magga-jig/plugins/events")(Magga.Mediator),
	View = require("./views/init.jsx"),
	Actions = require('./actions/actions.js');



module.exports = Jig.create({
	defaults: {
		view: View,
		route: "edit",
		nextRoute: "list",
		events: {
			// remote events
			"clicked.TodoItem.event": "handleClickTodoItem",
			"changed.Route.event": "handleRouteChange",
//			// own events
			"submit.ItemView.action": "handleChangeItem",
			"complete.ItemView.action": "handleCompleteItem",
			"delete.ItemView.action": "deleteItemView"
		}
	},
	plugins: {
		view: ReactPlugin,
		events: EventsPlugin
	},
	init: function(){
		console.log("[Jig.Todo.list] Call on create");
	}

},{
	init: function(){
		console.log("[Jig.Todo.list] Call on instance");
		this.store = {};
	},
	handleClickTodoItem: function(data){
		this.store.id = data.id;
		this.rerender();
	},
	handleChangeItem: function(item){
		if (item.id === this.store.id) {

			Magga.Mediator.publish('executeCommand.EventStore.action',{
				command:'changeDescription.Todo',
				params:{
					id:item.id,
					description:item.value
				}
			});
			Magga.Mediator.publish('historyBack.Router.action');
		}
	},

	handleCompleteItem: function(item){
		if (item.id === this.store.id) {

			Magga.Mediator.publish('executeCommand.EventStore.action',{
				command:'complete.Todo',
				params:{
					id:item.id
				}
			});
			Magga.Mediator.publish('historyBack.Router.action');
		}
	},

	handleRouteChange: function(data){
		if(data.route === this.defaults.route){
			this.rerender();
		}else{
			this.plugins.view.render();
			delete this.store.id;
		}
	},
	deleteItemView: function(item) {
		if (item.id === this.store.id) {
			Magga.Mediator.publish('executeCommand.EventStore.action',{
				command:'delete.Todo',
				params:{
					id:item.id
				}
			});
			Magga.Mediator.publish('historyBack.Router.action');
		}
	},
	rerender: function() {
		var self = this,
			id = self.store.id;
		if (typeof id !== 'undefined') {

			Magga.Mediator.publish('getProjection.EventStore.action', {
				projection:'TodoList',
				cb: function(projection){
					self.plugins.view.render({
						id: id,
						value: projection.todos[projection.todosUuids[id]].description
					});
				}
			});
		}
	}
});