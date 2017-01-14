import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../view'
import { connect } from 'react-redux'
import actions from '../../actions'

class Tasks extends Component {
	componentDidMount(){
		this.props.fetchTasks(null)
		.then(results => {
//			console.log(JSON.stringify('action.payload'))
		})
		.catch(err => {
			alert(err)
		})
	}

	createTask(task){
		this.props.submitTask(task)
		.then(result => {
//			console.log(JSON.stringify(result))
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
					{ (this.props.tasks.all == null) ? null :
							this.props.tasks.all.map((task, i) => {
								return <li key={task.id}>{task.title}</li>
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
