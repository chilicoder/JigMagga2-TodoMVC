var Magga = require("magga").getInstance(),
// todo rename into MaggaMediator
	Mediator = new (require("magga-mediator"))();

// todo use extension API
Magga.Mediator = Mediator;


Magga.render(Magga.createFactory(require("./index.conf")));

window['Magga'] = Magga;

setTimeout(function(){
	var id;
	Magga.Mediator.publish('createEntity.Store.action',{
		entity: 'Item',
		value: 'Some first item'
	});

	Magga.Mediator.publish('executeCommand.EventStore.action', {
			command:'create.Todo',
			cb: function(a){
				Magga.Mediator.publish('executeCommand.EventStore.action',{
					command:'changeDescription.Todo',
					params:{
						id:a,
						description:'OneMoreThing'
					},
					cb:function(a){console.log(a)
					}})
			}
		});

},2000);

setTimeout(function(){
	Magga.Mediator.publish('createEntity.Store.action',{
		entity: 'Item',
		value: 'Another second item'
	});
},4000);



