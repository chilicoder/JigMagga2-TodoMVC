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
//			"changed.Route.event": "changedRouteEvent",
			"updated.Item.event": "rerender",
			"savedDomainEvent.EventStore.event": "HandleSavedDomainEvent"
		}
	},
	plugins: {
		view: ReactPlugin,
		events: EventsPlugin
	}

},{
	init: function(){
		var self = this;

		self.rerender();
	},
//	changedRouteEvent: function(data){
//		console.log(data);
//	},
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
				self.plugins.view.render({store:projection});
			}
		});

	}
});