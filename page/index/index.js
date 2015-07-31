var Magga = require("magga").getInstance(),
<<<<<<< HEAD
	// todo rename into MaggaMediator
	Mediator = new (require("magga-mediator"))()
=======
// todo rename into MaggaMediator
	Mediator = new (require("magga-mediator"))();
>>>>>>> 7ad3d2b5939a72b39c4bbe50021a753d109376c6

// todo use extension API
Magga.Mediator = Mediator;


Magga.render(Magga.createFactory(require("./index.conf")));

