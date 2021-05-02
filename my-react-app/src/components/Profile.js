import React from 'react';

function Profile(props) {

  return (
    <main>
      <div className="login-container">
        <img src="https://green.cdn.energy/branding/logo-r.svg" id="green-logo" alt="Green logo" />
        <h2 className="login-header">You made it.</h2>
        <p>You are now on a page which can only be accessed by using the login form, as you just did.</p>
        <a href="#" onClick={props.logout}>Log out</a>
      </div>
    </main>
  );
}


// function logout() {
//   // Send request to server to log out:
//   fetch("/logout", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//     .then((res) => res.json())    // get JSON from result
//     .then((res) => {
//       // Redirect to profile, or show error message, depending on validation variable:
//       res.validation ? window.location = '/profile' : this.setState({errorMessage: 'Incorrect email'});
//     });
// }

export default Profile;
