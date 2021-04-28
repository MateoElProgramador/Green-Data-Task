const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/hello-react', (req, res) => {
  res.json({ message: "Node says hiya!"});
});

// listen to port 3000, and route if possible:
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});