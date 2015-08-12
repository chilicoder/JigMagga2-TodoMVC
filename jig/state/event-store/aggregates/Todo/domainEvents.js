module.exports = {
	"Created.Todo.event":function(data){
		this.description = '';
		this.status = 'undone';
	},
	"Changed.Todo/description.event": function(params) {
		this.description = params.description;
	},
	"Completed.Todo/status.event": function(){
		this.status = 'done';
	},
	"Reactivated.Todo/status.event": function(){
		this.status = 'undone';
	},
	"Deleted.Todo.event": function(){
		this.status = 'deleted';
	}
};