var Magga = require("magga").getInstance(),
// todo rename into MaggaMediator
	Mediator = new (require("magga-mediator"))();

// todo use extension API
Magga.Mediator = Mediator;


Magga.render(Magga.createFactory(require("./index.conf")));

window['Magga'] = Magga;

setTimeout(function(){
	Magga.Mediator.publish('executeCommand.EventStore.action', {
		command:'create.Todo',
		cb: function(a){
			Magga.Mediator.publish('executeCommand.EventStore.action',{
				command:'changeDescription.Todo',
				params:{
					id:a,
					description:'The very first todo'
				}
			});
		}
	});

},1000);

setTimeout(function(){
	var id;
	Magga.Mediator.publish('executeCommand.EventStore.action', {
		command:'create.Todo',
		cb: function(a){
			Magga.Mediator.publish('executeCommand.EventStore.action',{
				command:'changeDescription.Todo',
				params:{
					id:a,
					description:'OneMoreThing'
				}
			});
		}
	});

},1500);


setTimeout(function(){
	Magga.Mediator.publish('getProjection.EventStore.action', {
		projection:'TodoList',
		cb: function(a){
			console.log('QUERY result',a);
		}
	});
},4000);