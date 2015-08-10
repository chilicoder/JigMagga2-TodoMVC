module.exports = function (context){
    return function TodoList(){
        var self = this;
        self.todos = [];
        self.todosUuids = {};
        self.count = 0;
        self.countUndone = 0;

        // this function is called in Eventric. we use it to patch
        // context with projection by name cb() is needed for Eventric
        self.initialize = function(params, cb){
            if (typeof context['TodoList'] === 'undefined') {
                context.$projections['TodoList'] = self;
            }
            cb();
        };

        //NOTE: Eventric parses handle<eventName>

        self['handleCreated.Todo.event'] = function(domainEvent){
            var newTodo = {
                id: domainEvent.aggregate.id,
                description: domainEvent.payload.description,
                status: domainEvent.payload.status
            };
            self.todos.push(newTodo);
            self.todosUuids[domainEvent.aggregate.id] = self.todos.indexOf(newTodo);
            self.count++;
            self.countUndone++;
        };

        self['handleChanged.Todo/description.event'] = function(domainEvent){
            var key = self.todosUuids[domainEvent.aggregate.id];
            self.todos[key].description = domainEvent.payload.description;
        };


        self['handleCompleted.Todo/status.event'] = function(domainEvent){
            var key = self.todosUuids[domainEvent.aggregate.id],
                status = domainEvent.payload.status;
            self.todos[key].status = status;
            self.countUndone--;
        };

        self['handleReactivated.Todo/status.event'] = function(domainEvent){
            var key = self.todosUuids[domainEvent.aggregate.id],
                status = domainEvent.payload.status;
            self.todos[key].status = status;
            self.countUndone++;
        };

        self['handleDeleted.Todo.event'] = function(domainEvent){
            var key = self.todosUuids[domainEvent.aggregate.id];
            self.todos.splice(key,1);
            self.count--;
            self.countUndone--;
        };

    }
};