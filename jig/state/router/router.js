var Jig = require("magga-jig"),
	Magga = require("magga").getInstance(),
	Actions = require("./actions/actions.js"),
	EventsPlugin = require("magga-jig/plugins/events")(Magga.Mediator),
	r5 = require('router5');


// TODO That Jig is only for browser use we need to think about how to handle that

module.exports = Jig.create({
	defaults: {
		router: {
			options: {
				useHash: true,
				hashPrefix: '',
				defaultRoute: 'index'
			},
			routes: [
				{name: 'index', path: '/'},
				{name: 'active', path: '/active'},
				{name: 'completed', path: '/completed'}

			]
		},
		events: {
			"changeRoute.Router.action": "handleRouteChange",
			"addListener.Router.action": "addListener",
			"historyBack.Router.action": "historyBack"
		}
	},
	plugins: {
		events: EventsPlugin
	}

},{
	init: function(){
		var self = this,
			routerConfig = self.defaults.router,
			routes=[];
		Object.keys(routerConfig.routes).forEach(function(key){
			routes.push(routerConfig.routes[key]);
		});

		self.history = [];
		self.passHistorySave = false;

		self.router = new r5.Router5(routes,routerConfig.options);

		self.router.addListener(function(to, from){
			if (from && !self.passHistorySave) {
				self.history.push(from.name);
			}
			self.passHistorySave = false;
			Magga.Mediator.publish("changed.Route.event", {route: to.name});
		});


		self.router.start(function(){
			console.warn('Router started',self.router);
		});

		//TODO delete this after construcion
		window['Router'] = self.router;
	},
	addListener: function(data){
		if (data.route) {
			this.router.addNodeListener(data.route, data.cb);
		} else {
			this.router.addListener(data.cb);
		}
	},
	historyBack: function() {
		var self = this;
		if (typeof history !== 'undefined') {
			history.back();
		} else {
			if (self.history.length > 0) {
				self.passHistorySave = true;
				this.router.navigate(self.history.pop());
			}
		}
	},
	handleRouteChange: function(data){
		this.router.navigate(data.route);
	}
});