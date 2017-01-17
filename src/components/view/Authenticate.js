import React, { Component } from 'react'

class Authenticate extends Component {
	constructor(){
		super()
		this.state = {
			credentials: {
				username: '',
				phone: '',
				email: '',
				password: ''
			}
		}
	}

	updateCredentials(field, event){
		console.log('updateCredentials: '+field+' == '+event.target.value)
		let updated = Object.assign({}, this.state.credentials)
		updated[field] = event.target.value
		this.setState({
			credentials: updated
		})
	}

	register(event){
//		console.log('register: '+JSON.stringify(this.state.credentials))
		this.props.onRegister(this.state.credentials)
	}

	login(event){
//		console.log('login: '+JSON.stringify(this.state.credentials))
		this.props.onLogin(this.state.credentials)
	}

	render(){
		return (
			<div>
				<h3>Sign Up</h3>
				<input onChange={this.updateCredentials.bind(this, 'username')} type="text" placeholder="Username" /><br />
				<input onChange={this.updateCredentials.bind(this, 'phone')} type="text" placeholder="Phone" /><br />
				<input onChange={this.updateCredentials.bind(this, 'email')} type="text" placeholder="Email" /><br />
				<input onChange={this.updateCredentials.bind(this, 'password')} type="password" placeholder="Password" /><br />
				<button onClick={this.register.bind(this)}>Join</button>

				<h3>Log In</h3>
				<input onChange={this.updateCredentials.bind(this, 'email')} type="text" placeholder="Email" /><br />
				<input onChange={this.updateCredentials.bind(this, 'password')} type="password" placeholder="Password" /><br />
				<button onClick={this.login.bind(this)}>Login</button>
			</div>
		)
	}
}

export default Authenticate
