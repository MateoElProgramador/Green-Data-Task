const express = require('express');
const app = express();
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

// Any GET requests not handled above will return the React app:
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../my-react-app/build', 'index.html'));
});

// listen to port 3000:
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});