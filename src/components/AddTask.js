import React from "react";

const AddTask = ({ inputValue, handleInputChange, handleAddButton, error }) => {
  return (
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
  );
};

export default AddTask;
