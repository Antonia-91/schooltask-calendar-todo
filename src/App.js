import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Calendar from "./components/Calendar";
import Api from "./components/Api";


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);


 
  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    //console.log(data);

    /// compare
    const compare = (a, b) => {
      if (a.start < b.start) {
        return -1;
      }
      if (a.start > b.start) {
        return 1;
      }
      return 0;
    };
    data.sort(compare);
    //console.log(data);
    //  console.log(moment(data[0].start).valueOf());
    return data;
  };

  // FETCH SINGLE TASK
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    //console.log(data);
    return data;
  };

  // Delete
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // finish task UPDATING Server
  useEffect(() => {}, []);

  const onClickedTask = async (id) => {
    const taskToUpdate = await fetchTask(id);
    const uppDatedTask = { ...taskToUpdate, finish: !taskToUpdate.finish };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(uppDatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, finish: data.finish } : task
      )
    );
  };

  return (
    <div>
      <div className="container">
        <div className="calendar-container">
          <Api />
          <Calendar
            tasks={tasks}
            onAdd={addTask}
            fetchTasks={fetchTasks}
            onClicked={onClickedTask}
            onDelete={deleteTask}
            fetchTask={fetchTask}
          />
        </div>
        <div className="task-container">
          <Header onAdd={addTask} />
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onClicked={onClickedTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
