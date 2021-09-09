import React, { useState } from "react";
import moment from "moment";
import AddTask from "../components/AddTask";

const Popup = ({ handleClose, clickedEvent, onClicked, onDelete, onAdd }) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(clickedEvent);
  console.log("clickedEvent", clickedEvent.id);
  console.log("clickedEvent", clickedEvent.finish);

  let start = moment(clickedEvent.start).format("LLLL");
  let end = moment(clickedEvent.end).format("LLLL");

  return (
    <div className="popup-box">
      <div className="box" style={{ position: "relative", zIndex: 1 }}>
        <div className={`task ${clickedEvent.finish ? "finish" : ""}`}>
          <span className="close-icon" onClick={handleClose}>
            x
          </span>
          <h1>TODO:</h1>
          <div className="chioses">
            <span
              className="choises-finish"
              onDoubleClick={() => onClicked(clickedEvent.id)}
            >
              FINISH
            </span>
            <span
              className="choises-delete"
              onDoubleClick={() => onDelete(clickedEvent.id)}
            >
              Delete
            </span>
            <button className="btn" onClick={() => setModalOpen(true)}>
              Add Todo
            </button>
          </div>

          <h3>
            {clickedEvent.title} : {clickedEvent.content}{" "}
          </h3>
          <p>{start}</p>
          <p>{end}</p>
        </div>
      </div>
      <AddTask
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAdd}
      />
    </div>
  );
};

export default Popup;

// <FaTimes
//               style={{ cursor: "pointer"}}
//               onClick={() => onDelete(clickedEvent.id)}
//             />
