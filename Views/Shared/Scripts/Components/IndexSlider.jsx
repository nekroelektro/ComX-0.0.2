var IndexSlider = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            model: this.props.model
        };
    },
    render: function() {
        return (
			<div className="sideBar">
			</div>
		);
    }
});