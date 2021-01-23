const express = require('express');

const route = express.Router();
const taskController = require('./taskController')

route.get('/', taskController.getTasks, (req, res) => {
  res.status(200).json({tasks: res.locals.tasks})
})

route.post('/', taskController.createTask, (req, res) => {
  res.status(200).json({task: res.locals.task})
})

route.put('/', taskController.updateTask, (req, res) => {
  res.status(200).json({message: "Task Updated"})
})

route.delete('/', taskController.deleteTask, (req, res) => {
  res.status(200).json({message: "Task Deleted"})
})

module.exports = route