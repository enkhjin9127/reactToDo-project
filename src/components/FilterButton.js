import React from "react";

const FilterButtons = ({ setFilterState }) => {
  const handleFilterState = (state) => {
    setFilterState(state);
  };
  return (
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
      <button
        onClick={() => handleFilterState("LOG")}
        className="activityLogButton"
      >
        Activity Log
      </button>
    </div>
  );
};

export default FilterButtons;
