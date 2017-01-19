import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authenticate } from '../view'
import actions from '../../actions'

class Account extends Component {

	componentDidMount(){
		if (this.props.user == null)	//check current user
			return
		this.props.checkCurrentUser()
		.then(response => {
			
		})
		.catch(err => {
			console.log('ERROR:'+err.message)
		})
	}

	login(credentials) {
		console.log('Login'+JSON.stringify(credentials))
		this.props.login(credentials)
		.then(response => {


		})
		.catch(err => {
			alert(err.message)
		})

	}
	register(credentials){
		console.log('Login'+JSON.stringify(credentials))
		this.props.register(credentials)

	}
	render(){
		return (
			<div>
				<h2>Account</h2>
				{
					(this.props.user == null) ? <Authenticate onLogin={this.login.bind(this)} onRegister={this.register.bind(this)} /> : <h2>Welcome {this.props.user.username}</h2>
				}

			</div>

		)
	}
}

const stateToProps = (state) => {
	return {
		user: state.account.user //can be null
	}
}

const dispatchToProps = (dispatch) => {
	return {
		register: (credentials) => dispatch(actions.register(credentials)),
		login: (credentials) => dispatch(actions.login(credentials)),
		checkCurrentUser: () => dispatch(actions.checkCurrentUser())
	}
}

export default connect(stateToProps, dispatchToProps)(Account)
