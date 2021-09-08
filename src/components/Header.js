import React, { useState } from "react";
import AddTask from "../components/AddTask";

const Header = ({ onAdd }) => {
  //const [showAddTask, setShowAddTask] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="header">
      <h1>All My TODO´s</h1>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add Todo
      </button>
      <AddTask
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAdd}
      />
    </header>
  );
};

export default Header;
