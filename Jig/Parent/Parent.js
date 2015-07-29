var Jig = require("MaggaJig");


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