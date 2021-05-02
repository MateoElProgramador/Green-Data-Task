import React from 'react';
import {Route, Switch, Redirect, Link, BrowserRouter as Router} from 'react-router-dom';
import Login from './classes/Login';
import Profile from './classes/Profile';


class App extends React.Component {
	constructor(props) {
		super(props);
		alert("App created");
		this.state = {
			isAuthenticated: false
		}

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.getAuth = this.getAuth.bind(this);
	}


	login(e) {
		e.preventDefault();
		this.setState({ isAuthenticated: true });
		alert("Logged in");
	}

	logout(e) {
		e.preventDefault();
		this.setState({ isAuthenticated: false });
		alert("Logged out");
	}

	getAuth() {
		// alert("checking auth (" + this.state.isAuthenticated + ")");
		return this.state.isAuthenticated;
	}


	render(props) {
		return (
			<Router>
				<ul>
					<li><Link to='/'>Login</Link></li>
					<li><Link to='/profile'>Profile</Link></li>
				</ul>
				<Switch>
					{/* Seems a messy way of passing props to Routes, but I read it's the proper way */}
					<Route exact path='/'
						render={(props) =>
							<Login {...props}
								login={this.login}
								isAuth={this.getAuth}
								foo="bararara"/>
						}
					/>
					<PrivateProfileRoute path='/profile'
						isAuth={this.getAuth}
						logout={this.logout}
					/>
				</Switch>
			</Router>
		);
	}

}

// Route which checks for authentication and renders/redirects accordingly:
// Note: perhaps not correct for this component to be a member of the App class, but it makes
// 			 accessing isAuthenticated quick and easy
function PrivateProfileRoute ({ children, ...rest}) {
	const auth = rest.isAuth();
	alert("Profile: auth is " + auth);
	// alert("auth: " + rest.isAuthenticated);
	return (
		<Route {...rest} render={(props) => {
			return auth
				? <Profile {...props}
						logout={props.logout}
						foo="barrrrr"
					/>
				: <Redirect to='/notloggedin' />
		}} />
	)
}


export default App;