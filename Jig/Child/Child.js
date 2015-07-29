var Jig = require("MaggaJig"),
	Parent = require("../Parent/Parent.js")


module.exports = Parent.create({
	defaults: {
		testChild: "TEST"
	},
	plugins: {

	}

},{
	init: function(){
		console.log("Child Jig Init", this);
		Parent.prototype.init.call(this);
		this.childFN();
	},
	childFN: function(){
		this.parentFN();
	}
});