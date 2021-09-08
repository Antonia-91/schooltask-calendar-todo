import Task from "./Task"

const Tasks = ({ tasks, onDelete, onClicked }) => {

  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onClicked={onClicked}/>
      ))}
    </>
  );
};

export default Tasks;
