var ReactView = require('magga-jig/plugins/react'),
    React = require("react"),
    Actions = require('./../actions/actions.js'),
    Styles = require("./../style/init.scss");

module.exports = ReactView.create({

    init: function(data){
        if(!data){
            React.unmountComponentAtNode(document.querySelector(this.defaults.element));
            return;
        }
        // todo thats not good because it is not isomorphic
        React.render(React.createElement(this.reactComponent, {
            value: data
        }), document.querySelector(this.defaults.element));
        Styles(this.defaults)
    },
    handleSumbit: function(e){
        Actions.submitItem(this.props.item)
    },
    handleChange: function(e){
        this.props.item = e.target.value;
    },
    render: function(){
        return <div>
            <button className="yd-jig"  onClick={this.handleSumbit} >Ok</button>
        </div>;
    }

});

