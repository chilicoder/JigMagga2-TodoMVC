Handlebars = require('handlebars');

module.exports = {
    init: function(jig){
        this.jig = jig;
    },
    render: function(data){
        var templatePath = this.jig.defaults.view.template;
        var elementName = this.jig.defaults.view.element;

        if (typeof process !== 'undefined' && ("" + process.title).search("node") !== -1) {
            var template = require(templatePath);
            var html = template(data);
            // element will be a reference to a document
            // elementName.insert(html);
        }else{
            var templates = require("../build/js/templates");
            var html = templates.handlebars.template(data);
            // creating an element in which the html block will be inserted
            var element = document.querySelector(elementName);
            if (element === null) {
                element = document.createElement('div');
                element.className += elementName.slice(1);
                document.body.appendChild(element);
            }
            document.querySelector(elementName).innerHTML += html;
        }
    }
};