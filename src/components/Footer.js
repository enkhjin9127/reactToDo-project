import React from "react";

const Footer = ({ completedCount, totalTasks, clearCompleted }) => {
  return (
    <div className="taskCompleted center">
      <p>
        {completedCount} of {totalTasks} tasks completed
      </p>
      <button onClick={clearCompleted} className="clearButton">
        Clear completed
      </button>
    </div>
  );
};

export default Footer;
