import React from 'react';
import {Route, Switch, Redirect, Link, BrowserRouter as Router} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import './stylesheets/app.sass';


class App extends React.Component {
	constructor(props) {
		super(props);
		// alert("App created");			// useful for detecting when App component is recreated, hence losing state
		this.state = {
			isAuthenticated: false
		}

		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.getAuth = this.getAuth.bind(this);
	}

	// Methods passed to the login/profile components respectively,
	// which change the login status in the App component's state:

	login(e) {
		e.preventDefault();
		this.setState({ isAuthenticated: true });
		// alert("Logged in");
	}

	logout(e) {
		e.preventDefault();
		this.setState({ isAuthenticated: false });
		// alert("Logged out");
	}

	// Called by child components of App, to check login status
	getAuth() {
		// alert("checking auth (" + this.state.isAuthenticated + ")");
		return this.state.isAuthenticated;
	}


	render(props) {
		return (
			<Router>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/login'>Login</Link></li>
					<li><Link to='/profile'>Profile</Link></li>
				</ul>
				<Switch>
					<RootRoute exact path='/' isAuth={this.getAuth} />
					<LoginRoute path='/login'
						isAuth={this.getAuth}
						login={this.login}
					/>
					<ProfileRoute path='/profile'
						isAuth={this.getAuth}
						logout={this.logout}
					/>
				</Switch>
			</Router>
		);
	}

}


// Route which redirects to login or profile pages, depending on login status:
function RootRoute ({ children, ...rest}) {
	const auth = rest.isAuth();
	// alert("Root: auth is " + auth);
		return auth
			? <Redirect to='/profile' />
			: <Redirect to='/login' />
}

// Renders Login component, or redirects to Profile route:
function LoginRoute ({ children, ...rest}) {
	const auth = rest.isAuth();
	// alert("Login: auth is " + auth);
	return (
		<Route {...rest} render={(props) => {
			return auth
				? <Redirect to='/profile' />
				: <Login {...props}
						login={rest.login}
					/>
		}} />
	)
}

// Renders Profile component, or redirects to Login route:
function ProfileRoute ({ children, ...rest}) {
	const auth = rest.isAuth();
	// alert("Profile: auth is " + auth);
	return (
		<Route {...rest} render={(props) => {
			return auth
				? <Profile {...props}
						logout={rest.logout}
					/>
				: <Redirect to='/login' />
		}} />
	)
}


export default App;