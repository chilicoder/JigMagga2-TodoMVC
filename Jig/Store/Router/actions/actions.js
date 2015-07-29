var Magga = require("Magga").getInstance();

module.exports = {

	routeChange: function(data){
		Magga.Mediator.publish("routeChange.JigStoreRouter", data);
	}
}