var Magga = require("magga").getInstance(),
// todo rename into MaggaMediator
	Mediator = new (require("magga-mediator"))();

// todo use extension API
Magga.Mediator = Mediator;


Magga.render(Magga.createFactory(require("./index.conf")));

