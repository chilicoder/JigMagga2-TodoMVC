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
			"executeCommand.EventStore.action": "HandleExecuteCommand",
			"executeQuery.EventStore.action": "HandleExecuteQuery",
			"getProjection.EventStore.action": "HandleGetProjection",
			"printEvents.Store.action": "printEventsStoreAction"
		}
	},
	plugins: {
		events: EventsPlugin
	}
},{
	init: function() {
		var self = this,
			contextsConfig = self.defaults.context,
			context;
		self._m = Magga.Mediator;
		self.domainEvents = [];
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

					//subscribeToDomainEvents
					context.subscribeToDomainEvent(keyDomEv,function(domainE){
						self.domainEvents.push(domainE);
						self._m.publish('savedDomainEvent.EventStore.event', domainE);
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

			context.addQueryHandlers({
				getTodoList: function(params){
					return this;
				}
			});

			context.initialize();
		});

		self._m.publish('initialized.EventStore.event', self);

		//TODO only for debug. delete it
		window['EventStore'] = self;
	},

	HandleExecuteCommand: function(data){
		data.context = data.context || this.defaults.defaultContext;
		this.contexts[data.context].command(data.command, data.params).then(data.cb);
	},

	HandleExecuteQuery: function(data){
		data.context = data.context || this.defaults.defaultContext;
		this.contexts[data.context].query(data.query, data.params).then(data.cb);
	},

	HandleGetProjection: function(data){
		data.context = data.context || this.defaults.defaultContext;
		if (typeof data.cb !=='function') {
			throw new Error('Event-store Jig: No callback in GetContext Action',data);
		}
		if (typeof data.projection ==='undefined') {
			throw new Error('Event-store Jig: No projection stated in data: ',data);
		}
		data.cb(this.contexts[data.context].$projections[data.projection]);
	},
	printEventsStoreAction: function (){
		var self = this,
			store = self.domainEvents,
			key,id;

		console.table(store.map(function(item){
			return {
				time:item.timestamp,
				aggregateId: item.aggregate.id,
				aggregateName: item.aggregate.name,
				event: item.name,
				value: JSON.stringify(item.payload)
			}
		}));



	}
});
