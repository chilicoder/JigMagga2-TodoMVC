/**
 * Created by developer on 05.06.15.
 */
var React = require('react');
module.exports = {
    render: function (DEFAULTS) {
        React.render(
            React.createElement(DEFAULTS.display, {
                name: DEFAULTS.restaurant.name,
                location: DEFAULTS.restaurant.location
            }),
            document.getElementById(DEFAULTS.view.element));
    }
};
