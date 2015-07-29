/**
 * Created by developer on 10.06.15.
 */
var Jig = require('jig.js');
var React = require('react');
var MaggaMediator = require('magga-mediator');
var mediator = new MaggaMediator({
    plugins: {
        sockjs: {
            host: 'localhost',
            port: 8080,
            path: '/mediator'
        }
    },
    loadPlugins: ['simple', 'monitoring']
});
// React is not ideal for chat, because it does not append, but replace
// content in the DOM, so we just create a new element after user writes in the chat.
var createElementInDom = function (elementName) {
    var element = document.createElement('div');
    element.id = elementName;
    document.body.appendChild(element);
};

Jig.create('Chat_jig', {
    defaults: {
        view: {
            view: 'reactChat',
            element: 'chat'
        },
        // This is the view we want reactComponent 'defaults.view.view' to render.
        chat: React.createClass({
            displayName: 'chat',
            render: function () {
                return (
                    React.createElement('div', null,
                        this.props.name, ' wrote ', this.props.text)
                );
            }
        })
    },
    plugins: {
        view: require('./../../../plugins/view/reactView')
    },
    refreshUsername: function () {
        $('#name').first().val(function () {
            var id = Math.floor(Math.random() * 1000);
            return 'Incognito_' + id;
        }());
    },
    init: function () {
        var self = this;
        // assing ReactComponent that will render the messages.
        self.plugins.view.afterCreate(self);
        var counter = 1;
        self.refreshUsername();
        // subscribe to Mediator to receive messages.
        mediator.subscribe('dummyChannel', function (msg) {
            console.log('From dummychannel ', msg);
        });
        // subscribe a handler for received messages.
        mediator.subscribe('chatChannel', function (msg) {
            self.defaults.msg = msg;
            self.plugins.view.init(self.defaults);
            // add another element in DOM.
            self.defaults.view.element = 'chat' + counter++;
            createElementInDom(self.defaults.view.element);
            self.refreshUsername();
        });
        $('#form').submit(function (e) {
            var msg;
            e.preventDefault();
            msg = {
                name: $('#name').first().val(),
                text: $('#msg').first().val()
            };
            mediator.publish('chatChannel', msg);
            $('#msg').first().val('');
        });
    }
}, {});

