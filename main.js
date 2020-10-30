const inputTodo = document.querySelector(".add-input");
const buttonTodo = document.querySelector(".add-button");
const todoList = document.querySelector(".list-todo");
const filter = document.querySelector(".select-filter");

document.addEventListener('DOMContentLoaded', getLocalStorage);
buttonTodo.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);
filter.addEventListener('click', filterOption);

function addTodo(e) {
    e.preventDefault();

    //ToDo Div
    const todo = document.createElement('div');
    todo.classList.add('todo');

    //ToDo Li 
    const newTodo = document.createElement('li');
    newTodo.classList.add('item-todo');
    newTodo.innerText = inputTodo.value;
    todo.appendChild(newTodo);
    saveLocalStorage(inputTodo.value);

    //Clear Input
    inputTodo.value = '';

    //Todo Buttons
    const buttonComplete = document.createElement('button');
    buttonComplete.classList.add('complete-btn');
    buttonComplete.innerHTML = '<i class="fas fa-check"></i>';
    todo.appendChild(buttonComplete);
    
    const buttonTrash = document.createElement('button');
    buttonTrash.classList.add('trash-btn');
    buttonTrash.innerHTML = '<i class="fas fa-trash"></i>';
    todo.appendChild(buttonTrash);
    
    //Append to list
    todoList.appendChild(todo);
}

function checkDelete(e) {
    const click = e.target;
    const item = click.parentNode;
    if(click.classList[0] === 'complete-btn') {
        item.classList.toggle('completed')
    }
    if(click.classList[0] === 'trash-btn') {
        item.classList.toggle('drop');
        removeLocalStorage(item);
        item.addEventListener('transitionend', () => {
            item.remove();
        });
    }
}

function filterOption(e) { 
    todos = todoList.childNodes;
    console.log(todos);
    console.log(todoList);
    todos.forEach(function(todo) {
        console.log(todo)
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(!todo.classList.contains('completed'))
                    todo.style.display = 'none';
                break;
            case "uncompleted":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'none'
                } else {
                    todo.style.display = 'flex';
                }
                break;
        }
    });
}

function saveLocalStorage(todo) {
    //Check localstorage for todoList
    checkExistence();
    todolist.push(todo);
    localStorage.setItem('todolist', JSON.stringify(todolist));
}

function getLocalStorage() {
    checkExistence();
    todolist.forEach(function(todobject) {
        //ToDo Div
    const todo = document.createElement('div');
    todo.classList.add('todo');

    //ToDo Li 
    const newTodo = document.createElement('li');
    newTodo.classList.add('item-todo');
    newTodo.innerHTML = todobject;
    todo.appendChild(newTodo);

    //Todo Buttons
    const buttonComplete = document.createElement('button');
    buttonComplete.classList.add('complete-btn');
    buttonComplete.innerHTML = '<i class="fas fa-check"></i>';
    todo.appendChild(buttonComplete);
    
    const buttonTrash = document.createElement('button');
    buttonTrash.classList.add('trash-btn');
    buttonTrash.innerHTML = '<i class="fas fa-trash"></i>';
    todo.appendChild(buttonTrash);
    
    //Append to list
    todoList.appendChild(todo);
    });
}

function removeLocalStorage(todo) {
    checkExistence();
    todolist.splice(todolist.indexOf(todo.childNodes[0].innerText),1);
    localStorage.setItem('todolist', JSON.stringify(todolist));
}

function checkExistence() {
    if (localStorage.getItem('todolist') === null) {
        return todolist = [];
    } else {
        return todolist = JSON.parse(localStorage.getItem('todolist'));
    }
}
