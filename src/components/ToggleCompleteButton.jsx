var React = require('react');

var ToggleCompleteButton = React.createClass({
	render() {
		return(
			<div>
				<button className="btn" onClick={this.props.toggleHide}>
					{this.props.hideCompleted ? 'Show Completed' : 'Hide Completed'}
				</button>
			</div>
		)
	}
});
module.exports = ToggleCompleteButton