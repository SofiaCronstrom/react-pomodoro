import { useState } from "react";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("")
    
    return ( 
<div className="todo-comp">
    <form>
        <input type="text"/>
        <button type="submit">Add Task</button>
    </form>
</div>
     );
}
 
export default Todo;