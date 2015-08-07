module.exports = function (context){
    return function TodoList(){
        var self = this;
        self.todos = [];
        self.count = 0;

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
            console.log('PROJECTION: ',domainEvent);
            self.todos.push(domainEvent.aggregate);
            self.count++;
        };
    }
};