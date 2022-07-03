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
const id = idField.value;
const timestamp = timeField.value;
const body = bodyField.value;
const addTodo = () => {
	const id = idField.value;
const timestamp = timeField.value;
const body = bodyField.value;
	const status = "Not complete";
	// Todos.push({id,timestamp, body, status})
	idField.value = "";
	timeField.value = "";
	bodyField.value = "";
	addCharacter(id,timestamp,body,status)
function addCharacter(
					id,
					timestamp,
					body,
					status
				  ) {
					fetch("http://localhost:8000/posts", {
					  method: "POST",
					  headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					  },
					  body: JSON.stringify({
						id: id,
						timestamp: timestamp,
						body: body,
						status: status
					  }),
					})
					  .then(function (response) {
						return response.json();
					  })
					  .then(function (data) {
						console.log(data);
					  })
					  .catch((error) => console.log(error));
				  }
				
	

}
// const editTodo = (itemId) => {
// 	const id = itemId;
// 	const timestamp = timeField.value;
// 	const body = bodyField.value;
// 	timeField.value = getTimeStamp();
// 	bodyField.value = body;
// 	console.log(body)

// 	fetch(`http://localhost:8000/posts/${itemId}`,{
// 		method: 'PATCH',
// 		headers: {
// 		  'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 		  body:body
// 		})
// 	  }).then(res => {
// 		  res.json()
// 		})
// 	  .then(data => console.log(data))


// 	createTodoButton.style.display = "none"
// 	updateTodoButton.style.display = "block"

// }



// const updateTodo = () => {
// 	const todos = Todos.map(todo=>{
// 		if(todo.id === idField.value){
// 			todo.status = "Not complete";
// 			todo.body = bodyField.value;
// 			todo.timestamp = timeField.value;
// 			return todo;
// 		}else{
// 			return todo;
// 		}
// 	})
// 	Todos = todos;
// 	idField.value = "";
// 	timeField.value = "";
// 	bodyField.value = "";
	
// 	updateTodoButton.style.display = "none"
// 	createTodoButton.style.display = "block"
// }

const generateID = () => {
	let id = `${Math.random().toString(36).substr(2, 6)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 6)}`;
	return id;
}

const getTimeStamp = () => {
	let date = new Date();
	let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	return time;
}

const addNewTodo = () => {
	idField.value = generateID();
	timeField.value = getTimeStamp();
}
todoList.addEventListener('click', (e)=>{

	const id = e.target.parentElement.parentElement.dataset.id;

	if(e.target.classList.contains('fa-edit')){
	  editTodo(id);
	}
	
	if(e.target.classList.contains('fa-trash-alt')) {
		console.log(id)
	  deleteTodo(id);
 	}

	if(e.target.classList.contains('fa-check')){
	  markTodoAsComplete(id);
	}
})


const deleteTodo = (itemId) => {
	console.log(itemId)
	remove(itemId)
			 function remove(id){
				fetch(`http://localhost:8000/posts/${id}`, {
				  method: 'DELETE'
				}).then(() => {
				   console.log('removed');
				}).catch(err => {
				  console.error(err)
				});
}
}

const markTodoAsComplete = (itemId) => {
	console.log(itemId)

	fetch(`http://localhost:8000/posts/${itemId}`,{
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    status: 'Complete'
  })
}).then(res => {
	res.json()
  })
.then(data => console.log(data))

}
const editTodo = (itemId) => {
	createTodoButton.style.display = "none"
	updateTodoButton.style.display = "block"
	const {id, timestamp, status, body} = Todos.filter(todo => todo.id == itemId)[0];
	updateTodo(itemId)
	idField.value = id;
	timeField.value = getTimeStamp();
	bodyField.value = body;
}
const updateTodo = (id) => {
	fetch(`http://localhost:8000/posts/${id}`,{
				method: 'PATCH',
				headers: {
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({
				  body:body
				})
			  }).then(res => {
				  res.json()
				})
			  .then(data => console.log(data))
		
	updateTodoButton.style.display = "none"
	createTodoButton.style.display = "block"
}


addNewTodoButton.addEventListener('click', addNewTodo);
createTodoButton.addEventListener('click', addTodo);
updateTodoButton.addEventListener('click', updateTodo);