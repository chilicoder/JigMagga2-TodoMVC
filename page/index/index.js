var Magga = require("magga").getInstance(),
// todo rename into MaggaMediator
	Mediator = new (require("magga-mediator"))();

// todo use extension API
Magga.Mediator = Mediator;


Magga.render(Magga.createFactory(require("./index.conf")));

window['Magga'] = Magga;

setTimeout(function(){
	Magga.Mediator.publish('createEntity.Store.action',{
		entity: 'Item',
		value: 'Some first item'
	});
},2000);

setTimeout(function(){
	Magga.Mediator.publish('createEntity.Store.action',{
		entity: 'Item',
		value: 'Another second item'
	});
},4000);



