module.exports = {
    "create.Todo": function(params) {
        return this.$aggregate.create('Todo')
            .then(function (todo) {
                todo.$emitDomainEvent('Created.Todo.event');
                return todo.$save();
            });
    },
    "changeDescription.Todo": function(params) {
        return this.$aggregate.load('Todo', params.id)
            .then(function (todo) {
                todo.$emitDomainEvent('Changed.Todo/description.event', params);
                return todo.$save();
            });
    },
    "complete.Todo": function(params) {
        return this.$aggregate.load('Todo', params.id)
            .then(function (todo) {
                todo.$emitDomainEvent('Completed.Todo/status.event', params);
                return todo.$save();
            });
    },
    "reactivate.Todo": function(params) {
        return this.$aggregate.load('Todo', params.id)
            .then(function (todo) {
                todo.$emitDomainEvent('Reactivated.Todo/status.event', params);
                return todo.$save();

            });
    },
    "delete.Todo": function(params) {
        return this.$aggregate.load('Todo', params.id)
            .then(function (todo) {
                todo.$emitDomainEvent('Deleted.Todo.event', params);
                return todo.$save();
            });
    }
};