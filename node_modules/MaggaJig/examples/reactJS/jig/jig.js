var Jig = require('MaggaJig');
var ReactView = require('MaggaJig/plugins/react');

module.exports = Jig.create({
    defaults: {
        view: require('./views/view.js')
    },
    plugins: {
        view: ReactView
    },
    init: function () {
        console.log('Called on creation');
    }
}, {
    init: function () {
        this.plugins.view.render();
        console.log('Called on instantiation');
    }
});