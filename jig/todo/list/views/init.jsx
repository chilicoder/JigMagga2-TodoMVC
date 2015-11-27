// TODO: move to setState

app = {};
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';

var React = require("react"),
	Actions = require('./../actions/actions.js'),
	TodoItem = require('./todoItem.jsx'),
	TodoFooter = require('./todoFooter.jsx'),
	ENTER_KEY = 13;

module.exports = React.createClass({

	//init: function(data) {
	//	if(data === null){
	//		React.unmountComponentAtNode(document.querySelector(this.defaults.element));
	//		return;
	//	}

		//// todo thats not good because it is not isomorphic
		//React.render(
		//	React.createElement(this.reactComponent, {
		//		store : data
		//	}),
		//	document.querySelector(this.defaults.element)
		//);
	//},

	getInitialState: function () {
		// TODO This shouldn't be here. Find where to put it
		Actions.addRouteHandler(this.HandleRouteChange.bind(this));
		return {editing: null};
	},

	HandleRouteChange: function(route){
		switch (route.name) {
			case 'index':
				this.setState({nowShowing: app.ALL_TODOS});
				break;
			case 'active':
				this.setState({nowShowing: app.ACTIVE_TODOS});
				break;
			case 'completed':
				this.setState({nowShowing: app.COMPLETED_TODOS});
				break;
		}
	},

	toggleAll: function (event) {
		var todos = this.props.store.todos,
			checked = event.target.checked;
		Object.keys(todos)
			.map(function(key){
				return todos[key];
			})
			.forEach(function (todo) {
				if (checked) {
					if (todo.status === 'undone') {
						Actions.toggleItem(todo);
					}
				} else {
					if (todo.status === 'done') {
						Actions.toggleItem(todo);
					}
				}
			});
	},
	clearCompleted: function () {
		var todos = this.props.store.todos;
		Object.keys(todos)
			.map(function(key){
				return todos[key];
			})
			.forEach(function (todo) {
				if (todo.status === 'done') {
					Actions.deleteItem(todo);
				}
			});
	},

	edit: function (todo, callback) {
		// refer to todoItem.jsx `handleEdit` for the reason behind the callback
		this.setState({editing: todo.id}, callback);
	},

	save: function (todo, text) {
		Actions.submitItem({
			id: todo.id,
			value: text
		});
		this.setState({editing: null});
	},

	cancel: function () {
		this.setState({editing: null});
	},
	handleNewTodoKeyDown: function (event) {
		if (event.which !== ENTER_KEY) {
			return;
		}

		var val = React.findDOMNode(this.refs.newField).value.trim();
		if (val) {
			Actions.createItem({
				description: val
			});
			React.findDOMNode(this.refs.newField).value = '';
		}
		event.preventDefault();
	},
	render: function(){
		var store = this.props.store || [],
			main,

			todos = Object.keys(store.todos).map(function(key){
				return store.todos[key];
			}),

			shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
					case app.ACTIVE_TODOS:
						return (todo.status === 'undone');
					case app.COMPLETED_TODOS:
						return (todo.status === 'done');
					default:
						return true;
				}
			}, this),

			todoItems = shownTodos.map(function (todo){
				return (<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={function(){ return Actions.toggleItem(todo)}}
					onDestroy={function(){ return Actions.deleteItem(todo)}}
					onEdit={this.edit.bind(this, todo)}
					editing={this.state.editing === todo.id}
					onSave={this.save.bind(this, todo)}
					onCancel={this.cancel}
					/>);
//					return <li className="item"><div data-item-id={curr.id}>{curr.description}</div><div>{curr.status}</div></li>
			},this);

		if (todos.length) {
			main = (
				<section className="main">
					<input
						className="toggle-all"
						type="checkbox"
						onChange={this.toggleAll}
						checked={store.countUndone === 0}
						/>
					<ul className="todo-list">
						{todoItems}
					</ul>
				</section>
			);
		}

		var activeTodoCount = store.countUndone;

		var completedCount = todos.length - activeTodoCount;

		if (activeTodoCount || completedCount) {
			footer =
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted}
					/>;
		}

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						ref="newField"
						className="new-todo"
						placeholder="What needs to be done?"
						onKeyDown={this.handleNewTodoKeyDown}
						autoFocus={true}
						/>
				</header>
				{main}
				{footer}
			</div>
		);
	}
});