import "./App.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function App() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  const [filterState, setFilterState] = useState("ALL");
  const [inputValue, setInputValue] = useState("");
  const [activityLog, setActivityLog] = useState([]);

  const logActivity = (message) => {
    const timestamp = moment();
    setActivityLog((prevLog) => [...prevLog, { message, timestamp }]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddButton = () => {
    if (inputValue.length === 0) {
      setError("Please enter a task");
      logActivity("Error: Please enter a task");
      return;
    } else {
      setError("");
      const newTodo = { text: inputValue, id: uuidv4(), status: "ACTIVE" };
      setTodo([...todo, newTodo]);
      logActivity(`Added todo: ${inputValue} (ID: ${newTodo.id})`);
      setInputValue("");
    }
  };

  const handleBox = (id) => {
    const newTodos = todo.map((todo) => {
      if (todo.id === id) {
        const newStatus = todo.status === "DONE" ? "ACTIVE" : "DONE";
        logActivity(
          `Toggled status for todo: ${todo.text} (ID: ${id}) to ${newStatus}`
        );
        return { ...todo, status: newStatus };
      } else {
        return todo;
      }
    });
    setTodo(newTodos);
  };

  const handleDelete = (id) => {
    const todoToDelete = todo.find((todo) => todo.id === id);
    const newTodos = todo.filter((todo) => todo.id !== id);
    setTodo(newTodos);
    logActivity(`Deleted todo: ${todoToDelete.text} (ID: ${id})`);
  };

  const handleFilterState = (state) => {
    setFilterState(state);
    logActivity(`Set filter state to ${state}`);
  };

  const clearCompleted = () => {
    const newTodos = todo.filter((todo) => todo.status !== "DONE");
    setTodo(newTodos);
    logActivity("Cleared completed tasks");
  };

  const completedCount = todo.filter((todo) => todo.status === "DONE").length;

  return (
    <div className="App">
      <div className="App-container">
        <div className="App-inner-container">
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
            <button
              onClick={() => handleFilterState("ALL")}
              className="allTaskButton"
            >
              All
            </button>
            <button
              onClick={() => handleFilterState("ACTIVE")}
              className="activeTaskButton"
            >
              Active
            </button>
            <button
              onClick={() => handleFilterState("DONE")}
              className="completedTaskButton"
            >
              Completed
            </button>
          </div>
          <div className="Notask center column">
            {todo.length === 0 ? "No tasks yet. Add one above!" : null}
            {todo
              .filter((todo) => {
                if (filterState === "ALL") {
                  return true;
                } else if (filterState === "ACTIVE") {
                  return todo.status === "ACTIVE";
                } else if (filterState === "DONE") {
                  return todo.status === "DONE";
                }
                return false;
              })
              .map((todo) => {
                return (
                  <div className="todoTask" key={todo.id}>
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        checked={todo.status === "DONE"}
                        onChange={() => handleBox(todo.id)}
                      />
                      <p>{todo.text}</p>
                    </div>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="taskCompleted center">
            <p>
              {completedCount} of {todo.length} tasks completed
            </p>
            <button onClick={clearCompleted} className="clearButton">
              Clear completed
            </button>
          </div>
          <div className="footer center">
            <span>Powered by &nbsp;</span>
            <span className="pinecone"> Pinecone academy</span>
          </div>
          <div className="activity-log">
            <h2>Activity Log</h2>
            <ul>
              {activityLog.map((log, index) => (
                <li key={index}>
                  {log.message} - {moment(log.timestamp).fromNow()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
