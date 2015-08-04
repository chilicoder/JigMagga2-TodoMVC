var Jig = require("magga-jig"),
	Magga = require("magga").getInstance(),
	Actions = require("./actions/actions.js"),
	EventsPlugin = require("magga-jig/plugins/events")(Magga.Mediator);

function IdGenerator() {
}

IdGenerator.prototype.getNewId =  function (entity) {
	if (typeof this[entity] === 'undefined') {
		this[entity] = 1
	} else {
		this[entity] = this[entity] + 1;
	}
	return this[entity];
};

module.exports = Jig.create({
	defaults: {
		events: {
			"createEntity.Store.action": "createEntityAction",
			"query.Store.action": "queryStoreAction",
			"printEvents.Store.action": "printEventsStoreAction"
		}
	},
	plugins: {
		events: EventsPlugin
	}

},{
	init: function() {
		var self = this;
		self._store = {};
		self._m = Magga.Mediator;
		self.idgen = new IdGenerator();
	},
	createEntityAction: function(data){
		var self = this,
			entityName = data.entity,
			store = self._store,
			entity,id;
		if (typeof store[entityName] === 'undefined') {
			store[entityName] = {};
			self._subscribeNewEntity(entityName);
		}
		id = self.idgen.getNewId(entityName);
		entity = store[entityName][id] = {
			id: id,
			value: data.value,
			events: []
		};
		entity.events.push({
			time: new Date(),
			action: 'created',
			data:  (function(){return data})()
		});

		// send update event for those who only subscribed for update.
		self._m.publish('updated.'+entityName+'.event', {
			id: id,
			value: data.value
		});
	},
	queryStoreAction:  function(data){
		var self = this,
			response = self.getEntityValue(data.query);
		if (typeof data.cb === 'function') {
			data.cb(response);
		}
	},
	printEventsStoreAction: function (){
		var self = this,
			store = self._store,
			key,id;
		for (key in store) {
			console.log('events for the entity "'+key+'":');
			for (id in store[key]) {
				console.log('events for "'+key+'/'+id+'":');
				console.table(store[key][id].events.map(function(item){
					return {
						time:item.time,
						action: item.action,
						value: item.data
					}
				}));
			}

		}
	},
	_subscribeNewEntity: function (entityName) {
		var self = this,
			m = self._m,
			updateCallback = function (data) {
				var id = data.id,
					entity = self._store[entityName][id];
				if (typeof id === 'undefined' || typeof entity === 'undefined') {
					throw Error('STORE.JIG.UPDATE: No id in data or cant find entity in store. Data:', data);
				}
				entity.value = data.value;
				entity.events.push({
					time: new Date(),
					action: 'updated',
					data: (function(){return data.value})()
				});
				// if we have a callback lets start it
				if (typeof data.cb === 'function') {
					data.cb();
				}
			},
			deleteCallback = function (data) {
				var id = data.id,
					entity = self._store[entityName][id];
				if (typeof id === 'undefined' || typeof entity === 'undefined') {
					throw Error('STORE.JIG.DELETE: No id in data or cant find entity in store. Data:', data);
				}
				// send update event for those who only subscribed for update.
				m.publish('updated.'+entityName+'.event', {
					id: id,
					value: undefined,
					cb: function(){
						entity.events.push({
							time: new Date(),
							action: 'deleted'
						});
						delete entity.value;
						// if we have a callback lets start it
						if (typeof data.cb === 'function') {
							data.cb();
						}
					}
				});
			};
		m.subscribe('updated.'+entityName+'.event',updateCallback);
		m.subscribe('deleted.'+entityName+'.event',deleteCallback);
	},
	getEntityValue: function (query){
		var entity,
			result = null;
		if (query.id === '*') {
			entity = this._store[query.entity] || {};
			result = Object.keys(entity);
			result = result.map(function(item){
				return {
					id: item,
					value: entity[item].value
				}
			});
			result = result.filter(function(item){
				return typeof item.value !== 'undefined'
			})
		} else {
			entity = this._store[query.entity][query.id];
			if (typeof entity === 'undefined') {
				console.warn('getEntityState: '+query.name+' is undefined in Store');
			} else {
				result = entity.value;
			}
		}
		return result;
	}
});
