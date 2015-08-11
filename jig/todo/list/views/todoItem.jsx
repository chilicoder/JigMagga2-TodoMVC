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
			React.render(
				React.createElement(this.reactComponent, {
					store : data
				}),
				document.querySelector(this.defaults.element)
			);
		},
		onClick: function(e){
			Actions.clickTodoItem({
				id: e.target.getAttribute('data-item-id'),
				value: e.target.innerHTML
			});
		},
		addItem: function(e){
			Actions.clickAddItem();
		},
		render: function(){
			var store = this.props.store || [],
				items = store.todos.map(function (curr){
					return <li className="item"><div data-item-id={curr.id}>{curr.description}</div><div>{curr.status}</div></li>
				});
			return <div>
				<h2>Total number of items: <span>{store.count}</span></h2>
				<h2>Undone items: <span>{store.countUndone}</span></h2>
				<button onClick = {this.addItem}>New item</button>
				<ul onClick={this.onClick}>{items}</ul>
			</div>;
}
});