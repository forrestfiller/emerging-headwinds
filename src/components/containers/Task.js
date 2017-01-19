import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {

	componentDidMount(){

	}

	render(){
		const taskId = this.props.params.id
		const task = this.props.tasks[taskId]
		return (
			<div>
				{ task.title }<br />
				{ task.description }<br />
				{ task.category }<br />
				{ task.profile.username }<br />

				{
					(this.props.account.user == null) ? <h3>Please login or register to reply</h3> :
					<div>
						<h3>Reply</h3>
						<textarea placeholder="Enter Message to Respond"></textarea>
						<br />
						<button>Submit</button>
					</div>
				}
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
		tasks: state.task,
		account: state.account
	}
}

export default connect(stateToProps)(Task)
