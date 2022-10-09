
let listSearch = document.getElementById('search-task');
let todoForm = document.getElementById('todo-form');
let inputTask = document.getElementById('input-task');
let todoList = document.getElementById('todo-list');
let show = document.getElementsByClassName('show');
// event listeners

todoForm.addEventListener('submit', addItem);
todoList.addEventListener('click', removeItem);
listSearch.addEventListener('keyup', searchItem);
document.addEventListener('DOMContentLoaded', loadItems);

// search function
function searchItem() {
    let key = listSearch.value.toUpperCase();
    // console.log(key);
    let items = todoList.getElementsByTagName('li');
    // console.log(items)
    for (let i = 0; i < items.length; i++) {
        let element = items[i].textContent.toUpperCase();
        if (element.indexOf(key) != -1) {
            items[i].style.display = 'block';
        }
        else {
            items[i].style.display = 'none';
        }

    }
}
// functions
function removeItem(e) {
    if (e.target.classList.contains('delBtn')) {
        let item = e.target.parentElement;
        // console.log(item);
        removeFromLocalStorage(item);
        item.remove();
    }
}
function addItem(e) {
    e.preventDefault();
    let value = inputTask.value;
    // check for a value is empty or not
    // if empty give input else add to list
    if (value != '') {
        // create a list
        let li = document.createElement('li');
        li.className = 'list-of-Task';
        li.textContent = value;
        // creating edit and delete btn
        // let edtBtn = document.createElement('button');
        let delBtn = document.createElement('button');
        delBtn.className = 'btn delBtn';
        delBtn.textContent = 'X';
        li.appendChild(delBtn);
        todoList.appendChild(li);
        todoForm.reset();
        // local storage
        addToLocalStorage(value);
        showFromLocalStorage();
    }
    else {
        alertFunction();
    }
}

// load item from localStorage
function loadItems() {
    let list = getFromLocalStorage();
    // console.log(list)
    showFromLocalStorage();

    list.forEach(function (ele) {
        if (ele != "") {
            let li = document.createElement('li');
            li.className = 'list-of-Task';
            li.textContent = ele;
            // creating edit and delete btn
            // let edtBtn = document.createElement('button');
            // edtBtn.className = 'btn edtBtn';
            let delBtn = document.createElement('button');
            delBtn.className = 'btn delBtn';
            delBtn.textContent = 'X';
            li.appendChild(delBtn);
            todoList.appendChild(li);
        }
    });
}
// alert function
function alertFunction() {
    alert('please add your daily task..');
}
// for localStorage
function addToLocalStorage(value) {
    let storageItems = getFromLocalStorage();
    storageItems.push(value);
    localStorage.setItem('todo', JSON.stringify(storageItems));
}

function getFromLocalStorage() {
    let items = localStorage.getItem('todo')
    if (items === null) {
        items = [];
    }
    else {
        items = JSON.parse(items);
    }
    return items;
}
function showFromLocalStorage() {
    let list = getFromLocalStorage();
    if (list.length != 0) {
        todoList.parentElement.style.display = 'block';
    }
    else {
        todoList.parentElement.style.display = 'none';
    }
}

function removeFromLocalStorage(item) {
    let value = item.firstChild.textContent;
    // console.log(value);
    let dataFromLocalStorage = getFromLocalStorage();
    dataFromLocalStorage.forEach((val, index) => {
        // console.log(val, index);
        if (val === value) {
            dataFromLocalStorage.splice(index, 1); // you removed item from the local storage
            // now make removed array again
            localStorage.setItem('todo', JSON.stringify(dataFromLocalStorage));
        }
        showFromLocalStorage();
    })
    // console.log(dataFromLocalStorage)
}