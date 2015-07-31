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
			"clickTodoItem.JigTodoList": "handleClickItem",
			"routeChange.JigStoreRouter": "handleRouteChange",
			"changeItem.JigTodoEdit": "handleChangeItem"
		}
	},
	plugins: {
		view: ReactPlugin,
		events: EventsPlugin
	}

},{
	init: function(){
		this.plugins.view.render();
	},
	handleClickItem: function(data){
		this.plugins.view.render(null);
		Actions.changeRoute(this.defaults.nextRoute);
	},
	handleRouteChange: function(data){
		console.log(data);
		if(data.route === this.defaults.route){
			this.plugins.view.render();
		}else{
			// remove view
			this.plugins.view.render(null);
		}
	},
	handleChangeItem: function(data){
		this.plugins.view.render(data);
	}
});