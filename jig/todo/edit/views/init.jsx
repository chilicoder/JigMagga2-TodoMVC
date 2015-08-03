var ReactView = require('magga-jig/plugins/react'),
    React = require("react"),
    Actions = require('./../actions/actions.js');

module.exports = ReactView.create({

    init: function(data){
        if(!data){
            React.unmountComponentAtNode(document.querySelector(this.defaults.element));
            return;
        }
        // todo thats not good because it is not isomorphic
        React.render(React.createElement(this.reactComponent, {
            value: data.value,
            id: data.id
        }), document.querySelector(this.defaults.element));
    },
    handleSumbit: function(e){
        Actions.submitItem({
            id : this.props.id,
            value: this.props.value
        })
    },
    handleChange: function(e){
        this.props.value = e.target.value;
    },
    render: function(){
        return <div>
            <input type="text" value={this.props.value} onChange={this.handleChange} />
            <button onClick={this.handleSumbit} >Ok</button>
        </div>;
    }

});