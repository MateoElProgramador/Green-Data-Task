const express = require('express');
const app = express();

// Sessions for tracking permissions to profile page:
const session = require('express-session');
app.use(session({
  secret: 'verysecuresecret',
  resave: false,
  saveUninitialized: false
}));

// JSON wasn't being allowed to be send cross-origin (from React to Node), so this is required:
// bodyParser = require('body-parser');
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(require("body-parser").json());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const path = require('path');
const port = 3000;

// Allow Node access to built React project:
app.use(express.static(path.resolve(__dirname, '../my-react-app/build')));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.get('/hello-react', (req, res) => {
  res.json({ message: "Node says hiya!"});
});

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

// This route is only accessible when logged in
app.get('/profile', (req, res) => {
  res.json("You made it!");
});

// Any GET requests not handled above will return the React app:
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../my-react-app/build', 'index.html'));
// });

// listen to port 3000:
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});