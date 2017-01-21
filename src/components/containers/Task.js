import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Task extends Component {
	constructor(){
		super()
		this.state = {
			message:{
				text:''
			}
		}
	}

	componentDidMount(){
		console.log('componentDidMount: '+JSON.stringify(this.props))
	}

	submitMessage(event){
		event.preventDefault()
		console.log('submitMessage'+JSON.stringify(this.state.message))

		let updated = Object.assign({}, this.state.message)
		const user = this.props.account.user

		updated['profile'] = {
			id: user.id,
			username: user.username
		}

		updated['task'] = this.props.params.id

		const taskId = this.props.params.id
		const task = this.props.tasks[taskId]

		this.props.createMessage(updated)
		.then(response => {
			const params = {
				recipient: task.profile.id,
				text: updated.text
			}

			return this.props.notify(params)

		})
		.then(response => {
			alert('Thank you for submitting your bit to assist! Good luck!')
		})

		.catch(err => {
			console.log('message created failed: '+JSON.stringify(err))
		})

	}

	updateMessage(event){
		let updated = Object.assign({}, this.state.message)
		updated['text'] = event.target.value
		this.setState({
			message: updated
		})
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
						<textarea onChange={this.updateMessage.bind(this)} placeholder="Enter Message to Respond"></textarea>
						<br />
						<button onClick={this.submitMessage.bind(this)}>Submit</button>
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

const dispatchToProps = (dispatch) => {
	return {
		createMessage: (params) => dispatch(actions.createMessage(params)),
		notify: (params) => dispatch(actions.notify(params))
		}
}

export default connect(stateToProps, dispatchToProps)(Task)
