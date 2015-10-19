var React = require('react');

var ToDoList = React.createClass({
	render() {
	
		function createToDoItemRow(toDoItem){
		
			var style = {
				display: this.props.hideCompleted && toDoItem.completed ? 'none' : undefined
			};
		
			return(
				<div style={style} className="toDoItem" key={toDoItem.id}>
					<div className="description">
						{toDoItem.description}
					</div>
					<div className="action">
						<button className="btn" onClick={this.props.toggleComplete.bind(null, toDoItem)}>
							{toDoItem.completed ? 'Undo' : 'Complete'}
						</button>
					</div>
				</div>
			)
		
		}
	
		return(
			<div>
				{this.props.toDoItems.map(createToDoItemRow, this)}  
			</div>
		)
	}
});
module.exports = ToDoList