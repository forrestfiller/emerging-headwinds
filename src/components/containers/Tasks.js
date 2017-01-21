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
			<section id="banner">
				<div className="content">
					<h3>Current Tasks</h3>
					{ (this.props.tasks[this.props.tasks.selectedCategory] == null) ? null :
							this.props.tasks[this.props.tasks.selectedCategory].map((task, i) => {
								return (
									<div key={task.id} className="box">
										<Link to={'/task/'+task.id}>
											<h3>{task.title}</h3>
										</Link>

										<Link to={'/task/'+task.id}>
											{task.description}
										</Link>
									</div>
								)
							})
					}

				</div>
				<CreateTask onSubmitTask={this.createTask.bind(this)}/>
			</section>
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
		submitTask: (params) => dispatch(actions.submitTask(params))
	}
}

export default connect(stateToProps, dispatchToProps)(Tasks)
