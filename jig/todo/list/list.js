var Jig = require("magga-jig"),
	Magga = require("magga").getInstance(),
	ReactPlugin = require("magga-jig/plugins/react"),
	EventsPlugin = require("magga-jig/plugins/events")(Magga.Mediator),
	View = require("./views/init.jsx"),
	Actions = require('./actions/actions.js');



module.exports = Jig.create({
	defaults: {
		view: View,
		nextRoute: "edit",
		route: "list",
		events: {
			"clicked.TodoItem.event": "clickedTodoItemEvent",
			"changed.Route.event": "changedRouteEvent",
			"change.Item.action": "changeItemAction",
			"updated.Item.event": "rerender",
			"create.TodoItem.action": "createTodoItem",
			"savedDomainEvent.EventStore.event": "HandleSavedDomainEvent"

		}
	},
	plugins: {
		view: ReactPlugin,
		events: EventsPlugin
	}

},{
	init: function(){
		this.rerender();
	},
	clickedTodoItemEvent: function(data){
		Magga.Mediator.publish('changeRoute.Router.action',{
			route: this.defaults.nextRoute
		});
	},
	changedRouteEvent: function(data){
		console.log(data);
		if(data.route === this.defaults.route){
			this.rerender();
		}else{
			// remove view
			this.plugins.view.render(null);
		}
	},
	changeItemAction: function (data) {
//		var id = data.id,
//			value = data.value;
//		this.store[id] = value;
	//	Magga.Mediator.publish('changed.Item.event',data);
	},
	createTodoItem: function(value){
		value = value || 'New Item';
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
	HandleSavedDomainEvent: function(){
		var self = this;
		setTimeout(function(){
			self.rerender();
		},0);
	},
	rerender: function(){
		var self = this;
		Magga.Mediator.publish('getProjection.EventStore.action', {
			projection:'TodoList',
			cb: function(projection){
				self.plugins.view.render(projection);
			}
		});

	}
});