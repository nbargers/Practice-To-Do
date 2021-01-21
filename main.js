//This is where all the functions need to go for the application


//Get request from the database to get all the tasks

function getTasks() {

  fetch("/api/tasks/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        })
      .catch((error) => {
          console.log(error)
        })

}

//Post request to the database

function createTask() {
  
  const task = {
    title: document.getElementById("task"),
    due: document.getElementById("due")
  }

  fetch("/api/tasks/", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  })

}