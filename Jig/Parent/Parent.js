var Jig = require("magga-jig");


module.exports = Jig.create({
	defaults: {
		testParent : "TEST"
	},
	plugins: {

	}

},{
	init: function(){
		console.log("Parent Jig Init");
	},
	parentFN: function(){}
});