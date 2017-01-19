import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {

	componentDidMount(){
//		grab the task from the store:
	}

	render(){
		// grab the task from the store:
		const taskId = this.props.params.id
		const task = this.props.tasks[taskId]
		return (
			<div>
				{ task.title }<br />
				{ task.description }<br />
				{ task.category }<br />
				{ task.profile.username }<br />
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task
	}
}

export default connect(stateToProps)(Task)
