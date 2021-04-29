import React from "react";
import '../stylesheets/Profile.sass';

function Login() {

  // Gets the state of this component (data), and a function to change the state (setData):
  const [data, setData] = React.useState(null);

  // run a fetch side-effect independently of rendering, to get JSON from Node server:
  React.useEffect(() => {
    fetch("/hello-react")
      .then((res) => res.json())    // get JSON from result
      .then((data) => setData(data.message));   // save JSON as a state variable
  }, []);


  return (
    <main>
      <div className="login-container">
        <img src="https://green.cdn.energy/branding/logo-r.svg" id="green-logo" alt="Green logo" />
        <h2 className="login-header">Welcome to Green.</h2>
        <span className="login-subheader">Please enter your email below</span>
        <LoginForm></LoginForm>
      </div>
    </main>
  );


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>{!data ? "Loading..." : data}</p>
  //     </header>
  //   </div>
  // );
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      rememberDevice: false
    };

    // Bind handleInputChange to the class:
    this.handleInputChange = this.handleInputChange.bind(this);

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

    console.log("Changed input " + name + " to '" + value +"'");
  }

  render() {
    return (
      <form>
        <label for="email" id="email-label">Email address</label>
        <input
          name="email"
          type="email"
          onChange={this.handleInputChange}
          id="email-textbox"
          className="block input-border"
        />
        
        <label id="remember-device-label">
          <input
            name="rememberDevice"
            type="checkbox"
            id="remember-device-checkbox"
            checked={this.state.rememberDevice}
            onChange={this.handleInputChange} />
          Remember this device
        </label>

        <input type="submit" value="Sign in" id="signin-submit" className="block input-border" />

      </form>
    );
  }

}

export default Login;
