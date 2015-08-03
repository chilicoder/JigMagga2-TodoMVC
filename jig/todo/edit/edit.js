var Jig = require("magga-jig"),
	Magga = require("magga").getInstance(),
	ReactPlugin = require("magga-jig/plugins/react"),
	EventsPlugin = require("magga-jig/plugins/events")(Magga.Mediator),
	View = require("./views/init.jsx"),
	Actions = require('./actions/actions.js');



module.exports = Jig.create({
	defaults: {
		view: View,
		route: "",
		nextRoute: "list",
		events: {
			// remote events
			"clicked.TodoItem.event": "handleClickTodoItem",
			"changed.Route.event": "handleRouteChange",
//			// own events
			"change.Item.action": "handleChangeItem"
		}
	},
	plugins: {
		view: ReactPlugin,
		events: EventsPlugin
	},
	init: function(){
		console.log("[Jig.Todo.list] Call on create")
	}

},{
	// plugin / mixing ?
	store: {},
	init: function(){
		console.log("[Jig.Todo.list] Call on instance")
	},
	rerender: function(){
		this.plugins.view.render(this.store);
	},
	handleClickTodoItem: function(data){
		console.log("handleClickTodoItem");
		this.store.id = data.id;
		this.store.value = data.value;
		this.rerender();
	},
	handleChangeItem: function(item){
		if (item.id === this.store.id) {
			Magga.Mediator.publish('changed.Item.event', item);
			Magga.Mediator.publish('change.Route.action',{
				route: this.defaults.nextRoute
			});
		}
		// destroy view
//		this.plugins.view.render();
	},
	handleRouteChange: function(data){
		if(data.route === this.defaults.route){
			this.rerender();
		}else{
			if(!this.store.item){
				Actions.changeRoute("");
			}
			this.plugins.view.render();
		}
	}
});