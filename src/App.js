import "./App.css";
import moment from "moment";
import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import FilterButtons from "./components/FilterButton";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

const App = () => {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [filterState, setFilterState] = useState("ALL");

  const logActivity = (message) => {
    const timestamp = moment();
    setActivityLog((prevLog) => [...prevLog, { message, timestamp }]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddButton = () => {
    if (inputValue.length === 0) {
      alert("Please enter a task");
      logActivity("Error: Please enter a task");
      return;
    } else {
      setError("");
      const newTodo = { text: inputValue, id: uuid(), status: "ACTIVE" };
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
            <AddTask
              inputValue={inputValue}
              handleInputChange={handleInputChange}
              handleAddButton={handleAddButton}
              error={error}
            />
          </div>
          <FilterButtons setFilterState={setFilterState} />
          <TaskList
            todo={todo}
            filterState={filterState}
            handleBox={handleBox}
            handleDelete={handleDelete}
            activityLog={activityLog}
          />
          <Footer
            completedCount={completedCount}
            totalTasks={todo.length}
            clearCompleted={clearCompleted}
          />
          <div className="footer center">
            <span>Powered by &nbsp;</span>
            <span className="pinecone"> Pinecone academy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
