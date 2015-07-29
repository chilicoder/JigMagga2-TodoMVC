var ReactView = require('MaggaJig/plugins/react'),
	React = require("react"),
	Actions = require('./../actions/actions.js');

module.exports = ReactView.create({

    init: function(data){
    	if(data === null){
    		React.unmountComponentAtNode(document.querySelector(this.defaults.element));
    		return; 
    	}
    	console.log("NEW ITEM", data && data.item);
    	// todo thats not good because it is not isomorphic  
       React.render(React.createElement(this.reactComponent, data || {}), document.querySelector(this.defaults.element));
    },
    onClick: function(e){
    	Actions.clickTodoItem(e.target.innerHTML);
    },
    render: function(){
    	return <ul onClick={this.onClick}>
	    	<li className="item-1">Item 1</li>
	    	<li className="item-2">Item 2</li>
	    	<li className="item-3">Item 3</li>
    	</ul>;
    }

});