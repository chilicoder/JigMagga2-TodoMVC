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
			"submit.ItemView.action": "handleChangeItem"
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
		console.log("[Jig.Todo.list] Call on instance")
		this.store = {};
	},
	handleClickTodoItem: function(data){
		this.store.id = data.id;
		this.rerender();
	},
	handleChangeItem: function(item){
		if (item.id === this.store.id) {
			Magga.Mediator.publish('updated.Item.event', item);
			Magga.Mediator.publish('change.Route.action',{
				route: this.defaults.nextRoute
			});
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
	rerender: function() {
		var self = this,
			id = self.store.id;
		if (typeof id !== 'undefined') {
			Magga.Mediator.publish('query.Store.action',{
				query: {
					entity:'Item',
					id: id
				},
				cb: function(item){
					self.plugins.view.render({
						id: id,
						value: item
					});
				}
			});
		}
	}
});