import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import moment from "moment";

const Task = ({ task, onDelete, onClicked }) => {
  let start = moment(task.start).format("LLLL");
  let end = moment(task.end).format("LLLL");

  return (
    <div
      className={`task ${task.finish ? "finish" : ""}`}
      onDoubleClick={() => onClicked(task.id)}
    >
      <h3>
        {task.title}
        <FaTimes
          style={{ cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.content}</p>
      <p>{start} -</p>
      <p>{end}</p>
    </div>
  );
};

export default Task;

// const [finish, setFinish] = useState(false);

//   onCkecked(finish);

// <input
// type="checkbox"
// checked={finish}
// value={finish}
// onChange={(e) => setFinish(e.currentTarget.checked)}
// />
