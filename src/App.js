import "./App.css";

function App() {
  return (
    <div className="App center">
      <div className="App-container">
        <h1>To-Do list</h1>
        <div className="addTaskContainer">
          <input className="inputBox" placeholder="Add a new task..."></input>
          <button className="addButton">Add</button>
        </div>
        <div className="filterButtons">
          <button className="allTaskButton">All</button>
          <button className="activeTaskButton">Active</button>
          <button className="completedTaskButton">Completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
