var React = require('react');
var AddBox = require('./AddBox.jsx');
var ToDoList = require('./ToDoList.jsx');
var ToggleCompleteButton = require('./ToggleCompleteButton.jsx');
var _ = require('lodash');

var ToDoSection = React.createClass({

	addToDo(toDoItem){
		var toDoItems = this.state.toDoItems;		
		var maxId = _.max(_.pluck(toDoItems, "id"));
		toDoItem.id = maxId + 1;
		toDoItems.push(toDoItem);
		this.setState({ toDoItems: toDoItems });	
	},

	getInitialState() {
        return {
            toDoItems: [
				{description: 'Mow the yard', completed: false, id: 1},
				{description: 'Take out trash', completed: false, id: 2},
				{description: 'Grocery Shop', completed: false, id: 3}
			],
            hideCompleted: true
        }
    },
	
	toggleComplete(toDoItem) {
		var toDoItems = this.state.toDoItems;
		var item = toDoItems.find(item => {
			return item.id === toDoItem.id;
		});
		item.completed = !item.completed;
		this.setState({ toDoItems: toDoItems });
	},
	
	toggleHide(){
		this.setState({
			hideCompleted: !this.state.hideCompleted
		});
	},

	render() {
		return(
			<div>
				<AddBox addToDo={this.addToDo}/>	
				<ToDoList toDoItems={this.state.toDoItems} hideCompleted={this.state.hideCompleted} toggleComplete={this.toggleComplete} />	
				<ToggleCompleteButton toggleHide={this.toggleHide} hideCompleted={this.state.hideCompleted} />	
			</div>
		)
	}
});

module.exports = ToDoSection;