//This is where all the functions need to go for the application


const taskContainer = document.getElementById("Task List");


//Get request from the database to get all the tasks

function getTasks() {

  fetch("/api/tasks/")
      .then(res => res.json())
      .then(
        (result) => {
          taskList = result.tasks;
      
          taskList.forEach(element => {
          //create a div element to hold task
          const div = document.createElement('div')
          div.className = element.id
          taskContainer.appendChild(div);

          //create a p element to name task
          const task = document.createElement("p")
          task.id = 'task'
          task.innerText = element.title
          div.appendChild(task)

          //create a p element to name due date
          const due = document.createElement('p')
          due.id = 'due'
          dateObj = element.due
          console.log (dateObj)
          due.innerText = dateObj
          div.appendChild(due)

          //create a button to delete task

          let remove = document.createElement('button')
          remove.innerText = 'Remove Task'
          remove.className = 'delete'
          remove.id = element.id
          div.appendChild(remove)
          document.getElementsByClassName(`${element.id}`)[0].childNodes[2].addEventListener("click", function () {
            removeTask(remove.id)
            })      
          

          //create a button to edit task
          const update = document.createElement('button')
          update.innerText = 'Edit'
          update.className = 'update'
          update.id = element.id
          div.appendChild(update)
          document.getElementsByClassName(`${element.id}`)[0].childNodes[3].addEventListener("click", function () {
            updateTask(remove.id)
            })

          const save = document.createElement('button')
          save.innerText = 'Save'
          save.className = 'Save'
          save.id = element.id
          div.appendChild(save)
          document.getElementsByClassName(`${element.id}`)[0].childNodes[4].addEventListener("click", function () {
            saveTask(remove.id)
            })
          });
        })

      .catch((error) => {
          console.log(error)
        })
}

//Post request to the database

function createTask() {

  const title = document.getElementById("task");
  const dueDate = document.getElementById("due");
  console.log('date', dueDate)
  const task = {
    title: title.value,
    due: dueDate.value
  }
  
  fetch("/api/tasks/", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  })
  .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
         const {task} = result
      
          const div = document.createElement('div')
          div.className = task.id
          taskContainer.appendChild(div);

          //create a p element to name task
          const title = document.createElement("p")
          title.id = 'task'
          title.innerText = task.title
          div.appendChild(title)

          //create a p element to name due date
          const due = document.createElement('p')
          due.id = 'due'
          due.innerText = task.due
          div.appendChild(due)

          //create a button to delete task

          const remove = document.createElement('button')
          remove.innerText = 'Remove Task'
          remove.className = 'delete'
          remove.id = task.id
          div.appendChild(remove)
          document.getElementsByClassName(`${task.id}`)[0].childNodes[2].addEventListener("click", function () {
            removeTask(remove.id)
            })
    

          //create a button to edit task
          const update = document.createElement('button')
          update.innerText = 'Edit'
          update.className = 'update'
          update.id = task.id
          div.appendChild(update)
          document.getElementsByClassName(`${task.id}`)[0].childNodes[3].addEventListener("click", function () {
            saveTask(update.id)
            })


          //create a button to save edited task
          const save = document.createElement('button')
          save.innerText = 'Save'
          save.className = 'Save'
          save.id = task.id
          div.appendChild(save)
          document.getElementsByClassName(`${task.id}`)[0].childNodes[4].addEventListener("click", function () {
            saveTask(save.id)
            })

          title.value = " "

        })
      .catch((error) => {
          console.log(error)
        })
}

function removeTask (id) {
  //need to grab id and remove the task

  task = {
    id : id
  }

  const removeItem = document.getElementsByClassName(`${id}`)[0]
  removeItem.remove()

  fetch("/api/tasks/", {
    method: 'Delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  })
  .catch((error) => {
    console.log(error)
  })
}

function updateTask (id) {
  //need to get new input and update task

  const divContainer = document.getElementsByClassName(id)[0]
  divContainer.getElementsByTagName('p')[0].contentEditable = true;
  divContainer.getElementsByTagName('p')[1].contentEditable = true;
  divContainer.style.backgroundColor = "#dddbdb"
}


function saveTask (id) {
  //need to send updated task info to database
  console.log('saving')
  const divContainer = document.getElementsByClassName(id)[0]
  divContainer.getElementsByTagName('p')[0].contentEditable = false;
  divContainer.getElementsByTagName('p')[1].contentEditable = false;
  const title = divContainer.getElementsByTagName('p')[0].innerText
  const dueDate = divContainer.getElementsByTagName('p')[1].innerText
  divContainer.style.backgroundColor = "#FFFFFF"

  const task = {
    id: id,
    title: title,
    due: dueDate
  }

  fetch("/api/tasks/", {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  })
  .catch((error) => {
    console.log(error)
  })
}