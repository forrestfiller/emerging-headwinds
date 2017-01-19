import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link } from 'react-router'

class Tasks extends Component {
	getTasks(){
	//	console.log(JSON.stringify(results))
		if (this.props.tasks[this.props.tasks.selectedCategory] != null)
			return

		this.props.fetchTasks({category: this.props.tasks.selectedCategory})
		.then(results => {

		})
		.catch(err => {
			alert(err)
		})
	}

	componentDidMount(){
		this.getTasks()
	}

	componentDidUpdate(){
		this.getTasks()
	}

	createTask(task){
		if (task.category.length == 0)
			task['category'] = 'delivery'

		this.props.submitTask(task)
		.then(result => {
		})
		.catch(err => {
			console.log('ERROR: '+JSON.stringify(err))
		})
	}

	render(){
		return (
			<div>
				<h2>Tasks</h2>
				<ol>
					{ (this.props.tasks[this.props.tasks.selectedCategory] == null) ? null :
							this.props.tasks[this.props.tasks.selectedCategory].map((task, i) => {
								return (
									<li key={task.id}>
										<Link to={'/task/'+task.id}>
											{task.title}, {task.category}
										</Link>
									</li>
								)
							})
					}
				</ol>
				<CreateTask onSubmitTask={this.createTask.bind(this)}/>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchTasks: (params) => dispatch(actions.fetchTasks(params)),
		tasksReceived: (tasks) => dispatch(actions.tasksReceived(tasks)),
		// taskCreated: (task) => dispatch(actions.taskCreated(task))
		submitTask: (params) => dispatch(actions.submitTask(params))

	}
}

export default connect(stateToProps, dispatchToProps)(Tasks)
