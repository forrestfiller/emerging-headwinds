import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { Authenticate } from '../view'
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
		const taskList = this.props.tasks[this.props.tasks.selectedCategory]

		return (
			<section id="banner">
				<div  style={{paddingRight:10}} className="content">
					<h3>Current Tasks</h3>
					{ (taskList == null) ? null :
							taskList.map((task, i) => {
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
				<Authenticate />
			</section>
		)
	}
}
//				<CreateTask onSubmitTask={this.createTask.bind(this)}/> removed!
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
