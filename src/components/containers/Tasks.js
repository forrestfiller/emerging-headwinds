import React, { Component } from 'react'
import { APIManager } from '../../utils'

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
	render(){
		return (
			<div>
				Tasks Container
			</div>
		)
	}
}

export default Tasks
