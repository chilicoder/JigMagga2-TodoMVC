/**
 * Created by developer on 10.06.15.
 */
var React = require('react');
module.exports = {
    render: function (DEFAULTS) {
        React.render(
            React.createElement(DEFAULTS.chat, {
                name: DEFAULTS.msg.name,
                text: DEFAULTS.msg.text
            }),
            document.getElementById(DEFAULTS.view.element));
    }
};
