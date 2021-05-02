const express = require('express');
const app = express();

// JSON wasn't being allowed to be send cross-origin (from React to Node), so this is required:
// bodyParser = require('body-parser');
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(require("body-parser").json());

const path = require('path');
const port = 3000;

// Allow Node access to built React project:
app.use(express.static(path.resolve(__dirname, '../my-react-app/build')));

app.get('/hello-react', (req, res) => {
  res.json({ message: "Node says hiya!"});
});

//  NOT USED: Receieves POST request and form data from React, and checks against my email
//  (an experiment with passing data between React and Node)
app.post('/login', (req, res) => {
  console.log("Route reached!");
  console.log(JSON.stringify(req.body));

  if (req.body["email"] === "matthewharding92@gmail.com") {
    console.log("Correct email!");
    res.json({validation: true});
  } else {
    console.log("Incorrect email");
    res.json({validation: false});
  }

});

// All GET requests return the React app, and React's own routing displays the correct components:
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../my-react-app/build', 'index.html'));
});

// listen to port 3000:
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});