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
//			"changed.Item.event": "rerender",
			"change.Item.action": "changeItemAction",
			"updated.Item.event": "rerender"
		}
	},
	plugins: {
		view: ReactPlugin,
		events: EventsPlugin
	}

},{
//	store: {
//		"1": 'Item 1',
//		"2": 'Another Item 2'
//	},
	init: function(){
		this.rerender();
	},
	clickedTodoItemEvent: function(data){
		Magga.Mediator.publish('change.Route.action',{
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
		Magga.Mediator.publish('changed.Item.event',data);
	}
	,
	rerender: function(){
		var self = this;
		Magga.Mediator.publish('query.Store.action',{
			query: {
				entity:'Item',
				id: '*'
			},
			cb: function(items){
				self.plugins.view.render(items);
			}
		});
	}
});