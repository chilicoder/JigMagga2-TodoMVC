module.exports = {
	"Created.Todo.event":function(data){
		console.log('todoCreated',this);
//		this._m.publish('created.Todo.event', {todo: todo});
	},
	"Changed.Todo/description.event": function(params) {
		this.description = params.description;
	},
	"Changed.Todo/status.event": function(){}
}