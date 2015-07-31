var Jig = require("magga-jig"),
	Actions = require("./actions/actions.js"),
	EventsPlugin = require("magga-jig/plugins/events");

// TODO That Jig is only for browser use we need to think about how to handle that

module.exports = Jig.create({
	defaults: {
		events: {
			"changeRoute": "handleRouteChange"
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
		if(location.hash){
			Actions.routeChange({route: location.hash.replace(/^#/, "")});
		}
		onhashchange = function(){
			Actions.routeChange({route: location.hash.replace(/^#/, "")});
		}
	},
	handleRouteChange: function(data){
		var currentHash = (data.route + "").replace(/^#/, "") 
		location.hash = currentHash;
		Actions.routeChange(data);
	}

});