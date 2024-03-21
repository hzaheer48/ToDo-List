import { useState } from "react";
import AddTask from "./AddTask";
import AddTaskButton from "./AddTaskButton";
import Header from "./Header";
import Task from "./Task";
import EmptyTasks from "./EmptyTasks";

export default function ToDo() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [toDoTasks, setToDoTasks] = useState([]); 
  return (
    <>
      <Header />
      {toDoTasks.length === 0 ? (
        <EmptyTasks />
      ) : (
        toDoTasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            toDoTasks={toDoTasks}
            setToDoTasks={setToDoTasks}
          />
        ))
      )}
      {openAddTask && (
        <AddTask
          open={openAddTask}
          setOpen={setOpenAddTask}
          setToDoTasks={setToDoTasks}
        />
      )}
      <AddTaskButton setOpenAddTask={setOpenAddTask} />
    </>
  );
}
