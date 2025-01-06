import "./App.css";
import React, { useState } from "react";
import uniqid from "uniqid";

function App() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddButton = () => {
    if (inputValue.length === 0) {
      setError("Please enter a task");
      return;
    } else {
      setError("");
      setTodo([...todo, { text: inputValue, id: uniqid(), status: "ACTIVE" }]);
      setInputValue("");
    }
  };

  const handleBox = (id) => {
    console.log(id);
  };

  return (
    <div className="App">
      <div className="App-container">
        <div className="center column">
          <h2>To-Do list</h2>
          <div className="addTaskContainer">
            <input
              placeholder="Add a new task..."
              value={inputValue}
              onChange={handleInputChange}
              className="inputBox"
            />
            {error.length > 1 && <div>{error}</div>}
            <button onClick={handleAddButton} className="addButton">
              Add
            </button>
          </div>
        </div>
        <div className="filterButtons">
          <button className="allTaskButton">All</button>
          <button className="activeTaskButton">Active</button>
          <button className="completedTaskButton">Completed</button>
        </div>
        <div className="center column">
          {todo.length === 0 ? "No tasks yet. Add one above!" : null}
          {todo.map((todo) => (
            <div className="todoTask" key={todo.id}>
              <div style={{ display: "flex" }}>
                <input type="checkbox" onChange={() => handleBox(todo.id)} />
                {todo.text}
              </div>
              <button className="deleteButton">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
