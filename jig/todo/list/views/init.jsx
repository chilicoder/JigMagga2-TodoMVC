var ReactView = require('magga-jig/plugins/react'),
	React = require("react"),
	Actions = require('./../actions/actions.js');

module.exports = ReactView.create({
	init: function(data) {
		if(data === null){
			React.unmountComponentAtNode(document.querySelector(this.defaults.element));
			return;
		}
		console.log("NEW ITEM", data && data.item);
		// todo thats not good because it is not isomorphic
		React.render(React.createElement(this.reactComponent, data || {}), document.querySelector(this.defaults.element));
	},
	onClick: function(e){
		Actions.clickTodoItem({
			id: e.target.getAttribute('data-item-id'),
			value: e.target.innerHTML
		});
	},
	render: function(){
		return <ul onClick={this.onClick}>
			<li className="item-1" data-item-id="1"  >Item 1</li>
			<li className="item-2" data-item-id="2"  >Item 2</li>
			<li className="item-3" data-item-id="3"  >Item 3</li>
		</ul>;
	}
});