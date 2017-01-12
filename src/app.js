import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Home } from './components/layout'

class App extends Component {
	render(){
		return (
			<div>
				React Entry Point
				<Home />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
