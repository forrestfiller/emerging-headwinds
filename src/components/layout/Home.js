import React, { Component } from 'react'
import { Tasks, Categories, Account } from '../containers'

class Home extends Component {
	render(){
		return (

			<div id="wrapper">
					<div id="main">
						<div className="inner">

								<header id="header">
									<a href="#" className="logo"><strong>Emerging Headwinds</strong></a>
								</header>

								<Tasks /><br />
								<Account />
						</div>
					</div>
					<div id="sidebar">
						<Categories />
					</div>
			</div>

		)
	}
}

export default Home
