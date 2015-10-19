var React = require('react');

var AddBox = React.createClass({

	getInitialState(){
		return { description: '' };
	},

	addToDo(e) {
		e.preventDefault();
		this.props.addToDo({ description: this.state.description, completed: false});
		this.setState({description: ''});		
	},
	
	handleInput(e){
		this.setState({
			description: e.target.value
		});
	},

	render() {
		return(
			<div className="addTask">
				<form onSubmit={this.addToDo}>
					<input type="text" placeholder="add a task" value={this.state.description} onChange={this.handleInput}  />
				</form>
			</div>
		)
	}
});

module.exports = AddBox