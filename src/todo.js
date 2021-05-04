import React from "react";
import './Pomodoro.css'

const Todo = () => {
    
        const [todos, setTodos] = React.useState([]);
        const [todo, setTodo] = React.useState("");
        const [todoEditing, setTodoEditing] = React.useState(null);
        const [editingText, setEditingText] = React.useState("");
      
        React.useEffect(() => {
          const json = localStorage.getItem("todos");
          const loadedTodos = JSON.parse(json);
          if (loadedTodos) {
            setTodos(loadedTodos);
          }
        }, []);
      
        React.useEffect(() => {
          const json = JSON.stringify(todos);
          localStorage.setItem("todos", json);
        }, [todos]);
      
        function handleSubmit(e) {
          e.preventDefault();
      
          const newTodo = {
            id: new Date().getTime(),
            text: todo,
            completed: false,
          };
          setTodos([...todos].concat(newTodo));
          setTodo("");
        }
      
        function deleteTodo(id) {
          let updatedTodos = [...todos].filter((todo) => todo.id !== id);
          setTodos(updatedTodos);
        }
      
        function toggleComplete(id) {
          let updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }
            return todo;
          });
          setTodos(updatedTodos);
        }
      
        function submitEdits(id) {
          const updatedTodos = [...todos].map((todo) => {
            if (todo.id === id) {
              todo.text = editingText;
            }
            return todo;
          });
          setTodos(updatedTodos);
          setTodoEditing(null);
        }
      
        return (
          <div className="pomodoro">
          <div className="row">
            <h3>TASK LIST</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
                className="text"
              />
              <button className="button3" type="submit">Add task</button>
            </form>
            {todos.map((todo) => (
              <div key={todo.id} className="todo">
                <div className="todo-text">
                  <input
                    type="checkbox"
                    id="completed"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  {todo.id === todoEditing ? (
                    <input
                      type="text"
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                  ) : (
                    <div>{todo.text}</div>
                  )}
                </div>
                <div className="todo-actions">
                  {todo.id === todoEditing ? (
                    <button className="button3" onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                  ) : (
                    <button className="button3" onClick={() => setTodoEditing(todo.id)}>Edit</button>
                  )}
      
                  <button className="button3" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          </div>
         
        );
      };

 
export default Todo;