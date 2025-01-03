import "./App.css";
import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddButton = () => {
    setTodo([...todo, inputValue]);
    setInputValue("");
  };

  console.log("this is to do", todo);

  return (
    <div className="App">
      <div className="App-container">
        <div className="center column">
          <h2>To-Do list</h2>
          <div className="addTaskContainer">
            <input
              onChange={handleInputChange}
              className="inputBox"
              placeholder="Add a new task..."
            ></input>
            <button onClick={handleAddButton} className="addButton">
              Add
            </button>
            {todo.map((todo) => {
              return <div>{todo}</div>;
            })}
          </div>
        </div>
        <div className="filterButtons">
          <button className="allTaskButton">All</button>
          <button className="activeTaskButton">Active</button>
          <button className="completedTaskButton">Completed</button>
        </div>
        <div className="center">No tasks yet. Add one above!</div>
      </div>
    </div>
  );
}

export default App;
// 11:14
