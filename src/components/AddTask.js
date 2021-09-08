import { useState } from "react";
import Datetime from "react-datetime";
import Modal from "react-modal";
//import moment from "moment";

const AddTask = ({ isOpen, onClose, onAdd }) => {
  //isOpen, onClose,
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [finish, setFinish] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(title, start, end);

    onAdd({
      title,
      content,
      start,
      end,
      finish,
    });
    // setTitle("");
    // content("");
    // start("");
    // end("");
    onClose();
  };
  return (
    <div classNmape="modal-div" style={{ position: "relative", zIndex: 1 }}>
      <Modal isOpen={isOpen} onRequestClose={onClose}>
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
  );

  //   //////// VARIANT
  //   return (
  //     <Modal isOpen={isOpen} onRequestClose={onClose}>
  //     <form className="add-form" onSubmit={onSubmit}>
  //       <div className="form-control">
  //         <input
  //           placeholder="Title"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //       </div>

  //       <div className="form-control">
  //         <label>Start Date</label>
  //         <Datetime value={start} onChange={(date) => setStart(date)} />
  //       </div>
  //       <div className="form-control">
  //         <label>End Date</label>
  //         <Datetime value={end} onChange={(date) => setEnd(date)} />
  //       </div>
  //    <button className="btn"> Add Todo</button>
  //     </form>
  //     </Modal>
  //   );

  //   //////// VARIANT
  //   return (
  //     <form className="add-form" onSubmit={onSubmit}>
  //       <div className="form-control">
  //         <input
  //           placeholder="Title"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //       </div>
  //       <div className="form-control">
  //         <label>Start </label>
  //         <input
  //           type="date"
  //           name="start"
  //           min="2018-03"
  //           value={start}
  //           onChange={(date) => setStart(date)}
  //         />
  //       </div>

  //       <div className="form-control">
  //         <label>End</label>
  //         <input
  //           type="date"
  //           name="start"
  //           max="2022-03"
  //           value={end}
  //           onChange={(date) => setEnd(date)}
  //         />
  //       </div>
  //       <input type="submit" value="Save" className="btn btn-block" />
  //     </form>
  //   );

  ////// VARIANT
  //   return (
  //     <form className="add-form" onSubmit={onSubmit}>
  //       <div className="form-control">
  //         <input
  //           placeholder="Title"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //       </div>
  //       <div className="form-control">
  //         <label>Start </label>
  //         <input
  //           type="text"
  //           value={start}
  //           onChange={(e) => setStart(e.target.value)}
  //         />
  //       </div>

  //       <div className="form-control">
  //         <label>End</label>
  //         <input
  //           type="text"
  //           value={end}
  //           onChange={(e) => setEnd(e.target.value)}
  //         />
  //       </div>
  //       <input type="submit" value="Save" className="btn btn-block" />
  //     </form>
};

export default AddTask;
