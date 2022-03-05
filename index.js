var input = document.querySelector(".todo input");
var button = document.querySelector(".todo .btn");
var tasksList = document.querySelector(".tasks");
var filters = document.querySelectorAll(".filters span");

var tasks = JSON.parse(localStorage.getItem("task-list"));


function showtasks(filterId) {
  let li = "";
  tasks.forEach((task, id) => {
    let isCompleted = task.status == "completed" ? "checked" : "";
    if (filterId == task.status || filterId == "all"){
        li += `<li class="task">
            <label for="${id}">
                <input type="checkbox" onclick="updateStatus(this)" id=${id} name="${task.name}" ${isCompleted}>
                <p class="${isCompleted}">${task.name}</p>
            </label>
            <div class="settings">
                <i class="fa fa-trash" onclick="removeTask(${id})"></i>
            </div>
        </li>`;
    }
   
  });
  tasksList.innerHTML = li
}

filters.forEach(filter => {
    filter.addEventListener("click", ()=>{
        document.querySelector("span.active").classList.remove("active");
        filter.classList.add("active");
        showtasks(filter.id)
    })
})

function updateStatus(selected){
    let taskName = selected.parentElement.lastElementChild;
    if (selected.checked){
        taskName.classList.add("checked");
        tasks[selected.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
        tasks[selected.id].status = "pendding"
    }
    localStorage.setItem("task-list", JSON.stringify(tasks));
}

function removeTask(id){
    tasks.splice(id, 1)
    localStorage.setItem("task-list", JSON.stringify(tasks));
    if (tasks.length == 0){
        showInitialMessage()
    }else{
        showtasks("all");
    }
}

function showInitialMessage(){
    tasksList.innerHTML = `<h2>You don't have a task!</h2>`
}

if(!(tasks.length == 0)){
    showtasks("all");
}else{
    showInitialMessage()
}

function populateLocalStorage(inputTask) {
  if (!tasks) {
    tasks = [];
  }
  input.value = "";
  let taskInfo = { name: inputTask, status: "pedding" };
  tasks.push(taskInfo);
  localStorage.setItem("task-list", JSON.stringify(tasks));
  showtasks("all");
}

function clearStorage() {
    localStorage.clear();
    tasks = []
    showInitialMessage()
}

function isTask(inputTask){
    if (!inputTask) {
        alert("Please enter a task!")
      }else{
        populateLocalStorage(inputTask);
      }
}


input.addEventListener("keyup", (e) => {
  let inputTask = input.value;
  if (e.key == "Enter") {
    isTask(inputTask)
  }
});

button.addEventListener("click", (e) => {
  let inputTask = input.value;
  isTask(inputTask)
});
