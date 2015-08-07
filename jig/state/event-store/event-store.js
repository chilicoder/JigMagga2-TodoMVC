var Jig = require("magga-jig"),
	Magga = require("magga").getInstance(),
	Actions = require("./actions/actions.js"),
	EventsPlugin = require("magga-jig/plugins/events")(Magga.Mediator),
//	EventricStorePlugin = require("magga-jig/plugins/eventric-store"),
	Eventric = require('eventric'),
	TodoEvents = require("./aggregates/Todo/domainEvents.js"),
	TodoCommands = require("./aggregates/Todo/commandHandlers.js"),
	TodoListProjection = require('./projections/TodoList.js');



module.exports = Jig.create({
	defaults: {
		defaultContext: 'Todo',
		context: {
			Todo:{
				aggregates: {
					Todo:{
						domainEvents: TodoEvents,
						commands: TodoCommands
					}
				},
				projections: {
					TodoList: TodoListProjection
				}
			}
		},
		events: {
			//TODO add actions
			"executeCommand.EventStore.action": "HandleExecuteCommand"
		}
	},
	plugins: {
		events: EventsPlugin
//		store: EventricStorePlugin
	}
},{
	init: function() {
		var self = this,
			contextsConfig = self.defaults.context,
			context;
		self._m = Magga.Mediator;
		self.contexts = {};
		Object.keys(contextsConfig).forEach(function(key) {
			context = self.contexts[key] = Eventric.context(key);

			//patch of context to have projections by name
			context.$projections = {};

			//addAggregate for the context
			Object.keys(contextsConfig[key].aggregates).forEach(function (keyAggr) {
				var aggregateConf = contextsConfig[key].aggregates[keyAggr];
				context.addAggregate(keyAggr, function(){
					this.create = function (){};
				});

				// defineDomainEvents for the context
				Object.keys(aggregateConf.domainEvents).forEach(function (keyDomEv) {
					var domainEvent = aggregateConf.domainEvents[keyDomEv],
						defObj = {};
					defObj[keyDomEv] = domainEvent;
					context.defineDomainEvents(defObj);

					//subscribeToDomainEvent
					context.subscribeToDomainEvent(keyDomEv,function(domainE){
						self._m.publish(keyDomEv,domainE);
					});
				});

				//addCommandHandlers for this aggregate
				Object.keys(aggregateConf.commands).forEach(function (keyCmd) {
					var command = aggregateConf.commands[keyCmd],
						defObj = {};
					defObj[keyCmd] = command;
					context.addCommandHandlers(defObj) ;
				});

			});

			//projections
				Object.keys(contextsConfig[key].projections).forEach(function (keyProj) {
					var projection = contextsConfig[key].projections[keyProj](context);
					context.addProjection(keyProj, projection);
				});

			context.initialize();
		});

		//TODO only for debug. delete it
		window['EventStore'] = self;
	},

	HandleExecuteCommand: function(data){
		data.context = data.context || this.defaults.defaultContext;
		this.contexts[data.context].command(data.command, data.params).then(data.cb);
	}
});
