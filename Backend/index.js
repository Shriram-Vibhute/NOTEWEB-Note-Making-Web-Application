const express = require('express')
const connectToMongo = require('./db');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000 // React will get served on 3000 port
app.use(express.json());
app.use(cors()) // while using fetch API in Front end you cannot directly fetch data from server thats why you have to use npm cors package (IMP)

// Available Routes -> files are at routes
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/notes/', require('./routes/notes'))

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNoteBook Backend App listening on port ${port}`)
}) // Creation of our own server