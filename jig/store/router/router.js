var Jig = require("magga-jig"),
	Magga = require("magga").getInstance(),
	Actions = require("./actions/actions.js"),
	EventsPlugin = require("magga-jig/plugins/events")(Magga.Mediator);

// TODO That Jig is only for browser use we need to think about how to handle that

module.exports = Jig.create({
	defaults: {
		events: {
			"change.Route.action": "handleRouteChange"
		}
	},
	plugins: {
		events: EventsPlugin
	}

},{
	init: function(){
		this.initRouter()
	},
	initRouter: function(){
		var onhashchange = function(){
			Actions.routeChange({route: location.hash.replace(/^#/, "")});
		};
		if(location.hash){
			onhashchange();
		}
	},
	handleRouteChange: function(data){
		var currentHash = (data.route + "").replace(/^#/, "")
		location.hash = currentHash;
		Actions.routeChange(data);
	}
});