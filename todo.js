
// Assigning all elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners(){// All EventListeners
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Are you sure about deleting all?")){
        //Deleting Todo form the UI
        //todoList.innerHTML = ""; //Useful but slow!
        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            //Couldn't found...

            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }



    })
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo deleted successfully...")
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); // Deleting element from arrey
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })

}

function addTodo(e){
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger","Please add a todo...");
    }
    else {
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);

        showAlert("success","Todo successfully added ...");
    }
    
    
    
    
    

    e.preventDefault();

}
function getTodosFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //SetTimeout

    setTimeout(function(){
        alert.remove();
    },1500);

}
function addTodoToUI(newTodo){//Adding string value to the UI as a list item

    //Creating List item

    const listItem =document.createElement("li");
    //Link oluşturma
    const link =document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";


    // Adding Text Node

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Adding list item to the Todo List
    
    todoList.appendChild(listItem);
    todoInput.value = "";

}