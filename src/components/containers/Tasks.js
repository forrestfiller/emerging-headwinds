import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { CreateTask } from '../view'

class Tasks extends Component {
	componentDidMount(){
		APIManager
		.get('/api/task', null)
		.then(response => {
			console.log(JSON.stringify(response))
		})
		.catch(err => {
			console.log('ERROR: '+JSON.stringify.err)
		})
	}

	createTask(task){
//		console.log('CREATE TASK: '+JSON.stringify(task))
		APIManager
		.post('/api/task', task)
		.then(response => {
			console.log(JSON.stringify(response))
		})
		.catch(err => {
			console.log('ERROR: '+JSON.stringify.err)
		})
	}

	render(){
		return (
			<div>
				Tasks Container
				<CreateTask onSubmitTask={this.createTask.bind(this)}/>
			</div>
		)
	}
}

export default Tasks
