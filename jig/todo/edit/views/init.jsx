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
    getInitialState: function() {
        // naming it initialX clearly indicates that the only purpose
        // of the passed down prop is to initialize something internally
        return {value: this.props.value};
    },
    handleSumbit: function(e){
        Actions.submitItem({
            id : this.props.id,
            value: this.state.value
        })
    },
    handleDelete: function(e){
        Actions.deleteItem({
            id : this.props.id
        })
    },
    handleComplete: function(e){
        Actions.completeItem({
            id : this.props.id
        })
    },
    handleChange: function(e){
        this.setState({value: e.target.value});
    },
    render: function(){
        return <div>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <button onClick={this.handleSumbit} >Ok</button>
            <button onClick={this.handleComplete} >Complete</button>
            <button onClick={this.handleDelete} >Delete</button>
        </div>;
    }

});