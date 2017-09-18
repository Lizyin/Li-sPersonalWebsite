const express = require('express')  
const app = express()  
const port = 3000

var path = require('path')
//app.use(express.static(path.join(__dirname, '/HTML')));

app.get('/', (request, response) => {  
  response.sendFile('HTML/index.html');
})

// app.get('/twitter', (request, response) => {  
//   response.sendFile(__dirname +'/case-study-big-data-project.html');
// })
app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})