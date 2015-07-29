Handlebars = require('handlebars');
var path = require('path');

module.exports = {
    init: function (jig) {
        this.jig = jig;
    },
    render: function (data) {
        var templatePath = this.jig.defaults.view.template;
        var elementName = this.jig.defaults.view.element;

        if (typeof process !== 'undefined' && ("" + process.title).search("node") !== -1) {
            var template = require(templatePath);
            var renderedHtml = template(data);
            var distHtml = "<html><head><title></title></head><body><div class='changelog' id='foo'></div></body></html>";
            var elementName = elementName.slice(1);

            var regex = new RegExp("(class='" + elementName + "'.*?\>)", "gi");
            var newDistHtml = distHtml.replace(regex, function myFunction(x) {
                return x + renderedHtml
            });
            console.log(newDistHtml);
        } else {
            var templates = require("../../build/js/templates.js");
            var fileName = templatePath.replace(/^.*[\\\/]/, '').split('.')[0];
            var renderedHtml = templates.handlebars[fileName](data);

            // creating an element in which the html block will be inserted
            var element = document.createElement('div');
            element.className += elementName.slice(1);
            document.body.appendChild(element);

            document.querySelector(elementName).innerHTML += renderedHtml;
        }
    }
};