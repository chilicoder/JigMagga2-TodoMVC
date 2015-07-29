/**
 * Created by developer on 05.06.15.
 */
// ReactView = require('./reactView.js');
describe.skip('ReactView Layer:', function () {
    it('renders default object', function () {
        var Jig = require('jig.js');
        var React = require('react');
        var restaurantsInfo = { name: 'Ivy', location: 'Disneyland, FL'};
        // create element in DOM to insert new data.
        var elementName = '.react-test';
        var element = document.createElement('div');
        element.id = elementName.slice(1);
        document.body.appendChild(element);
        Jig.create('Test.Namespace', {
            defaults: {
                view: {
                    view: 'react-test',
                    element: element.id
                },
                restaurant: restaurantsInfo,
                display: React.createClass ({
                    displayName: 'Restaurants',
                    render: function () {
                        return (
                            React.createElement('div', null,
                                'The restaurant name is ', this.props.name,
                                ', and its location is ', this.props.location)
                        );
                    }
                })
            },
            plugins: {
                view: require('./../../plugins/react')
            }
        }, {
            init: function () {
            }
        });
        console.log('If test fails, go to plugins/view/reactView and choose reactComponent');
        var jigRender = new Test.Namespace();
    });
});
