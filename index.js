//!Selectors
const todoInput = document.querySelector(".textInput");
const todoButton = document.querySelector(".add-button");
const todoFilter = document.querySelector(".filter-todo");
const todoList = document.querySelector(".todo-list");

//?alerts
const alertWarning = document.querySelector(".alert-warning");
const alertSucces = document.querySelector(".alert-success");

//!Events 

todoButton.addEventListener("click",addtodo);
todoList.addEventListener("click",deleteCheck);
todoFilter.addEventListener("click",filterTodo);
document.addEventListener("DOMContentLoaded", function () {
    getTodos();
});


//!functions 

function addtodo(e){
    e.preventDefault();

const isEmpty = str => !str.trim().length;

if(isEmpty(todoInput.value)){
    alertWarning.style.display = "block";
setTimeout(() => {
    alertWarning.style.display = "none";
}, 1500);
todoInput.value = ""; 
} else{
    alertSucces.style.display = "block";
    setTimeout(() => {
        alertSucces.style.display = "none";
    }, 1500);
    saveLocalTodos(todoInput.value);

//? Create to do div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");  
  

//? check mark button
const completedButton = document.createElement("button");
completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

//? Create Todo li
const newTodo = document.createElement("li");
newTodo.innerText = todoInput.value;
newTodo.classList.add("todo-item");
todoDiv.appendChild(newTodo);

//? check trash button
const trashButton = document.createElement("button");
trashButton.innerHTML = " <i class='fa fa-minus-circle'></i>";
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);


//? Append to list
todoList.appendChild(todoDiv);

//? Clear todo Input Value
todoInput.value = ""; 

}
    
}

function deleteCheck(e){
    const item = e.target;
  //? Delete todo

if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocaleStorage(todo);
    todo.addEventListener("transitionend",function(){
        todo.remove();
    });
}

if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
}
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (item) {
        switch (e.target.value){
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if(item.classList.contains("completed")){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!item.classList.contains("completed")){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
                break;
            
        }
    });

}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
todos.forEach((todo) => {
    //? Create to do div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");  
  

//? check mark button
const completedButton = document.createElement("button");
completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

//? Create Todo li
const newTodo = document.createElement("li");
newTodo.innerHTML = todo;
newTodo.classList.add("todo-item");
todoDiv.appendChild(newTodo);

//? check trash button
const trashButton = document.createElement("button");
trashButton.innerHTML = " <i class='fa fa-minus-circle'></i>";
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);


//? Append to list
todoList.appendChild(todoDiv);

})
}

function removeLocaleStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

const todoIndex = todo.children[1].innerText;
todos.splice(todos.indexOf(todoIndex),1);
localStorage.setItem("todos", JSON.stringify(todos));
}