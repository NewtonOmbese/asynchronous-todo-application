const addNewTodoButton = document.getElementById("add-new-todo");
const createTodoButton = document.getElementById("create-todo");
const updateTodoButton = document.getElementById("update-todo");
const idField = document.getElementById("id-field");
const timeField = document.getElementById("time-field");
const bodyField = document.getElementById("body-field");
const todoList = document.querySelector(".todo-content");
const div = document.createElement("div");
updateTodoButton.style.display = "none"
let Todos = [];

// REST api

const displayAllTodos = () => {
	todoList.innerHTML = ""
	axios.get("http://localhost:3000/posts").then(res => {	
		Todos = [...res.data]
		if (Todos.length == 0) {

			todoList.innerHTML += `
			<div class = "empty-todo">
			<img src="./assets/images/undraw_empty_xct9.png" alt="empty image" style="width: 50%;">
			<br>
			<span style="font-family: 'Fira Sans', sans-serif; font-size: 20px; font-weight: bold;">There are no todos yet...</span>
			<br>
			</div>
			`;
		} else {		
			for(let key in Todos){
				let todo = Todos[key];
				todoList.innerHTML += `
				<div data-id="${todo.id}" class="todo-content-item">
					<span class="todo-id">▪️ ${todo.id} ▪️</span>
					${todo.status === "Complete" ? `<span style="text-decoration: line-through;" class="todo-text">${todo.body}</span>` : `<span class="todo-text">${todo.body}</span>`}
					<span class="todo-date">Created at : ${todo.timestamp}</span>
					${todo.status === "Complete" ? `<span class="todo-status complete">▪️ ${todo.status} ▪️</span>` : `<span class="todo-status incomplete">▪️ ${todo.status} ▪️</span>`}
					<div style="display: flex; flex-direction: column; justify-content: space-around; align-items: center;" class="actions-window">
						<i class="far fa-edit"></i>
						<i class="far fa-trash-alt"></i>
						${todo.status === "Complete" ? "" : '<i class="fas fa-check"></i>'}
					</div>
				</div>
				`;
			};
		}
	}).catch(err => console.log(err));

	console.log(Todos);
}
displayAllTodos();
