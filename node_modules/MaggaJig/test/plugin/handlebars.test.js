var Handlebars = require('./../../plugins/handlebars');

describe('handlebars', function () {
    it.skip('handlebars', function () {
        var Jig = require('jig.js');
        var template = './../examples/templates/ChangeLog.hbs';
        var elementName = '.changelog';
        var jigInstance;
        var viewData = {
            name: 'JigMagga',
            changes: [
                {
                    version: '2.0.0',
                    date: '11-June-2015',
                    topics: [{
                        name: 'Core',
                        features: [
                            'New feature in the api',
                            'Fixed Bug #f123'
                        ]
                    }, {
                        name: 'Plugins',
                        features: [
                            'ReactView plugin integrated',
                            'Handlebars plugin integrated'
                        ]
                    }]
                }
            ]
        };
        Jig.create('Test.Namespace', {
            defaults: {
                view: {
                    element: elementName,
                    template: template
                }
            },
            plugins: {
                view: Handlebars
            }
        }, {
            init: function () {
                // functions gets called in instantiation with 'new' operator
                this.plugins.view.init(this);
                this.plugins.view.render(viewData);
            }
        });
        jigInstance = new Test.Namespace();
    });
});