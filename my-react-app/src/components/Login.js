import React from 'react';

function Login(props) {
  // Gets the state of this component (data), and a function to change the state (setData):
  // const [data, setData] = React.useState(null);

  // run a fetch side-effect independently of rendering, to get JSON from Node server:
  // React.useEffect(() => {
  //   fetch("/hello-react")
  //     .then((res) => res.json())    // get JSON from result
  //     .then((data) => setData(data.message));   // save JSON as a state variable
  // }, []);

  return (
    <main>
      <div className="login-container">
        <img src="https://green.cdn.energy/branding/logo-r.svg" id="green-logo" alt="Green logo" />
        <h2 className="login-header">Welcome to Green.</h2>
        <span className="login-subheader">Please enter your email below</span>
        <LoginForm
          login={props.login}
        />
      </div>
    </main>
  );
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      rememberDevice: false,
      errorMessage: ''
    };

    // Bind handleInputChange to the class:
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // Handles the change of either form input, changing the state accordingly:
  handleInputChange(event) {
    const target = event.target;  // where event came from
    // Get value of changed input (covers whether checkbox is checked):
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name    // name of changed input, required for setting state correctly

    // set state of form object based on changed input:
    this.setState({
      [name]: value
    });
  }

  // NOT USED: Packages form information into JSON to send to the Node server:
  handleSubmit(event) {
    event.preventDefault();   // stop default submit behaviour from occurring
    
    // package email and remember device into JSON
    // send JSON to /login (POST)

    // Send form data to Node via POST:
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({"email": this.state.email,
                            "rememberDevice": this.state.rememberDevice}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())    // get JSON from result
      .then((res) => {
        // Redirect to profile, or show error message, depending on validation variable:
        res.validation ? window.location = '/profile' : this.setState({errorMessage: 'Incorrect email'});
      });

  }


  render(props) {
    return (
      // <form onSubmit={this.handleSubmit}>
      <form onSubmit={this.props.login}>
        <label for="email" id="email-label">Email address</label>
        <input
          name="email"
          type="email"
          onChange={this.handleInputChange}
          id="email-textbox"
          className="block input-border"
        />

        <span id="login-error-message">{this.state.errorMessage}</span>
        
        <div id="remember-device-container">
          <label id="remember-device-label">
            <input
              name="rememberDevice"
              type="checkbox"
              id="remember-device-checkbox"
              checked={this.state.rememberDevice}
              onChange={this.handleInputChange} />
            Remember this device
          </label>
        </div>

        <input
          type="submit"
          value="Sign in"
          id="signin-submit"
          className="block input-border"
        />

      </form>
    );
  }

}

export default Login;
