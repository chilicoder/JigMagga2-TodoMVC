var Jig = require("MaggaJig"),
	Magga = require("Magga").getInstance(),
	ReactPlugin = require("MaggaJig/plugins/react"),
	EventsPlugin = require("MaggaJig/plugins/events"),
	View = require("./views/init.jsx"),
	Actions = require('./actions/actions.js');



module.exports = Jig.create({
	defaults: {
		view: View,
		route: "edit",
		nextRoute: "list",
		events: {
			// remote events
			"clickTodoItem.JigTodoList": "handleClickTodoItem",
			"routeChange.JigStoreRouter": "handleRouteChange",
			// own events
			"changeItem.JigTodoEdit": "handleChangeItem"
		}
	},
	plugins: {
		view: ReactPlugin,
		events: EventsPlugin
	},
	init: function(){
		console.log("[Jig.Todo.List] Call on create")
	}

},{
	// plugin / mixing ?
	store: {},
	init: function(){
		console.log("[Jig.Todo.List] Call on instance")
	},
	handleClickTodoItem: function(data){
		console.log("handleClickTodoItem")
		this.store.item = data.item;
	},
	handleChangeItem: function(){
		// destroy view
		this.plugins.view.render();
		Actions.changeRoute(this.defaults.nextRoute);
	},
	handleRouteChange: function(data){
		if(data.route === this.defaults.route){
			this.plugins.view.render(this.store.item);
		}else{
			if(!this.store.item){
				Actions.changeRoute("");
			}
			this.plugins.view.render();
		}
	}
});