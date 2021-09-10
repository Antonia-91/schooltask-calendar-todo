//https://fullcalendar.io/docs/react
// https://www.npmjs.com/package/react-modal
// https://www.npmjs.com/package/react-datetime

////////////////////   alternatvi 2
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import Datetime from "react-datetime";
import Popup from "./Popup";
import Api from "./Api";

const Calendar = ({
  tasks,
  onAdd,
  addEvent,
  onClicked,
  onDelete,
  holidays,
  fetchTask,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [finish, setFinish] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedEvent, setClickedEvent] = useState("");

  const calendarRef = React.createRef();

  //////--  Calendar Callback Functions for Plugins --////////
  

  // const onEventAddes = (holidays) => {
  //   let calendarApi = calendarRef.current.getApi();
  //   calendarApi.addEvent(holidays);
  // };
  //addEvent={onEventAddes(holidays)}

  // catch clicked date and use in and nes todo start-date
  const clickHandler = (dateClickInfo) => {
    console.log(dateClickInfo.date);
    setStart(dateClickInfo.date);
    setModalOpen(true);
  };

  // style output in calendar
  function renderEventContent(tasks) {
    return (
      <div
        style={{ color: "black", cursor: "pointer" }}
        className={`${tasks.event._def.extendedProps.finish ? "finish" : ""}`}
      >
        {tasks.event.title}
      </div>
    );
  }

  //close modal
  const onClose = () => {
    setModalOpen(false);
  };

  // on submut, set states
  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({
      title,
      content,
      start,
      end,
      finish,
    });

    onClose();
  };

  // //create an object of clicket event., and send to popup-Modal
  // const getEvent = (tasks) => {
  //   console.log(tasks.event._def.publicId);

  //   let details = {
  //     title: tasks.event.title,
  //     content: tasks.event._def.extendedProps.content,
  //     start: tasks.event._instance.range.start,
  //     end: tasks.event._instance.range.end,
  //     finish: tasks.event._def.extendedProps.finish,
  //     id: tasks.event._def.publicId,
  //   };

  //   console.log(details)
  //   setClickedEvent(details);
  //   setIsOpen(!isOpen);
  // };

  //create an object of clicket event., and send to popup component
  const getEvent = async (tasks) => {
    console.log(tasks.event._def.publicId);

    let details = {
      title: tasks.event.title,
      content: tasks.event._def.extendedProps.content,
      start: tasks.event._instance.range.start,
      end: tasks.event._instance.range.end,
      finish: tasks.event._def.extendedProps.finish,
      id: tasks.event._def.publicId,
    };
    const taskToGet = await fetchTask(tasks.event._def.publicId);
    console.log(taskToGet);
    //console.log(details);
    setClickedEvent(taskToGet);
    console.log("clickedEvent", clickedEvent);
    setIsOpen(!isOpen);
  };

  // close popup window
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        {isOpen && (
          <Popup
            getEvent={getEvent}
            handleClose={handleClose}
            clickedEvent={clickedEvent}
            onClicked={onClicked}
            onDelete={onDelete}
            onAdd={onAdd}
          />
        )}
      </div>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={tasks}
          dateClick={clickHandler}
          eventContent={renderEventContent}
          eventClick={getEvent}
        />
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Modal isOpen={modalOpen} onRequestClose={onClose}>
          <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control">
              <input
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label>Start Date</label>
              <Datetime value={start} onChange={(date) => setStart(date)} />
            </div>

            <div className="form-control">
              <label>End Date</label>
              <Datetime value={end} onChange={(date) => setEnd(date)} />
            </div>

            <input
              type="checkbox"
              checked={finish}
              value={finish}
              style={{ display: "none" }}
              onChange={(e) => setFinish(e.currentTarget.checked)}
            />
            <button className="btn"> Add Todo</button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Calendar;

////// Alternativ två ! anvädvänd <AddTask component itstäkket för att upprepa formulret , men då funkar inte min dateClick={clickHandler} Plugin som fångar kliuckat datum i kalendern ....

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import React, { useState } from "react";
// import interactionPlugin from "@fullcalendar/interaction";
// import Modal from "react-modal";
// import Datetime from "react-datetime";
// import AddTask from "../components/AddTask";

// const Calendar = ({ tasks, onAdd }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [finish, setFinish] = useState(false);

//   const calendarRef = React.createRef();

//   //   const onEventAddes = (tasks) => {
//   //     let calendarApi = calendarRef.current.getApi();
//   //     calendarApi.addEvent(tasks);
//   //   };

//   const clickHandler = (dateClickInfo) => {
//     //console.log(dateClickInfo.date);
//     setStart(dateClickInfo.date);
//     setModalOpen(true);
//   };

//   function renderEventContent(tasks) {
//     //console.log(tasks);
//     return (
//       <div style={{ color: "blue", cursor: "pointer" }}>
//         {tasks.event.title}
//       </div>
//     );
//   }

//   const onClose = () => {
//     setModalOpen(false);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     onAdd({
//       title,
//       content,
//       start,
//       end,
//       finish,
//     });

//     onClose();
//   };

//   //testing
//   const getEvent = (tasks) => {
//     console.log(tasks);
//     console.log(tasks.event.title);
//     console.log(tasks.event._def.content);
//     alert(tasks.event.title);
//     alert(tasks.event._def.content);
//   };

//   return (
//     <>
//       <div style={{ position: "relative", zindex: 0 }}>
//         <FullCalendar
//           ref={calendarRef}
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={tasks}
//           dateClick={clickHandler}
//           eventContent={renderEventContent}
//           eventClick={getEvent}
//         />
//       </div>
//       <AddTask
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onAdd={onAdd}
//       />
//     </>
//   );
// };

// export default Calendar;
