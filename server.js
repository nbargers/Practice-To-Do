const express = require('express');
const path = require('path');
const routes = require('./routes')

const app = express();

const PORT = 3000;

//Handle parsing request

app.use(express.json());
//Serve files

app.use(express.static(__dirname + '/client'));

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, './client/index.html'))
})

//Routes

app.use("/api/tasks", routes)

//Handle unknown routes.

app.use('*', (req, res) => {
res.status(404).send("Route does not exist");
});

//Global Error Handler

app.use((err, req, res, next) => {
  console.log('Global Error', err);
  const defaultError = {
    log: 'Express error handler caught: unknown middleware error',
    status: 400,
    message: {
      err: 'Unexpected error occured',
    },
  };

  const errObj = Object.assign(defaultError, err);
  console.log('SEREVER ERROR:', errObj.log);
  return res.status(errObj.status).json(errObj.message);
});


//Instruct server to listen on designated port

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));