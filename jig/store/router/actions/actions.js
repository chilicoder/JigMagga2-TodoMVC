var Magga = require("magga").getInstance();

module.exports = {

	routeChange: function(data){
		Magga.Mediator.publish("routeChange.JigStoreRouter", data);
	}
}