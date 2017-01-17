import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Authenticate } from '../view'
import actions from '../../actions'

class Account extends Component {
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
				<Authenticate onLogin={this.login.bind(this)} onRegister={this.register.bind(this)} />
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
		login: (credentials) => dispatch(actions.login(credentials))
	}
}

export default connect(stateToProps, dispatchToProps)(Account)
