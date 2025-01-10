import React from "react";

const TaskList = ({
  todo,
  filterState,
  handleBox,
  handleDelete,
  activityLog,
}) => {
  return (
    <div className="center column">
      {filterState === "LOG" ? (
        <div className="activity-log">
          <ul>
            {activityLog.map((log, index) => (
              <li key={index}>
                {log.message} -{" "}
                {log.timestamp.format("MMMM Do YYYY, h:mm:ss a")}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        todo
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
          .map((todo) => (
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
          ))
      )}
    </div>
  );
};

export default TaskList;
