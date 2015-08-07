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
    }
};