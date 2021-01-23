const pool = require('./database.js');

const taskController = {};

taskController.getTasks = async (req, res, next) => {

  try {
    const query = 'SELECT * FROM tasks'
    const tasks = await pool.query(query)

    const {rowCount, rows} = tasks

    if (rowCount){
      res.locals.tasks= rows
      next()
    }
  } catch (error) {
    return next({
      log: `taskController.getTasks: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    })
  }
}

taskController.createTask = async (req, res, next) => {
  
  const {title, due} = req.body;

  try {
    query = 'INSERT INTO tasks (title, due) VALUES ($1, $2) RETURNING *'
    const task = await pool.query(query, [title, due])

    const {rows, rowCount} = task;

    if (rowCount){
      res.locals.task = rows[0]
      next ()
    }
  } catch (error) {
    next({
      log: `taskController.createTasks: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    })
  }
}

taskController.updateTask = async (req, res, next) => {

  const {title, due, id} = req.body;

  try {
    const query = 'UPDATE tasks SET title = $1, due =$2 WHERE id =$3 RETURNING *';
    const task = await pool.query(query, [title, due, id]);

    next()
  
  } catch (error) {
    next ({
      log: `taskController.updateTask: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    })
  }
}

taskController.deleteTask = async (req, res, next) => {

  const {id} = req.body;

  try {
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    const task = await pool.query(query, [id]);

    if(task.rowCount) next()

  } catch (error) {
    next({
      log: `taskController.deleteTask: ${error}`,
      status: 500,
      message: {
        err: 'Internal server error',
      },
    })
  }
}

module.exports = taskController;