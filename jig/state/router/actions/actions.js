var Magga = require("magga").getInstance();

module.exports = {

	routeChange: function(data){
		Magga.Mediator.publish("changeRoute.Router.action", data);
	}
}