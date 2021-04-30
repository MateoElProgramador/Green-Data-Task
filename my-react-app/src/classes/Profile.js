import React from "react";
// import '../stylesheets/Profile.sass';

function Profile() {

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

export default Profile;
