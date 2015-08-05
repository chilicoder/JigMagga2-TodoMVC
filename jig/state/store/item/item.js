var Commands = require('./commands/commands.js'),
    id = 0,
    Item = Object.create({
        _commands: Object.keys(Commands),
        _fields: ['id','value','status']
    });



Item._commands.forEach(function(key){
    Item[key] = Commands[key];
});

