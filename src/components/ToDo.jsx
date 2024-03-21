import { useState } from "react";
import AddTask from "./AddTask";
import AddTaskButton from "./AddTaskButton";
import Header from "./Header";
import Task from "./Task";
import EmptyTasks from "./EmptyTasks";

export default function ToDo() {
  const [openAddTask, setOpenAddTask] = useState(false);
  const [toDoTasks, setToDoTasks] = useState([
    {
      title: "Task 1",
      pending: ["Task 1 pending item 1", "Task 1 pending item 2"],
      completed: ["Task 1 completed item 1", "Task 1 completed item 2"]
    },
    {
      title: "Task 2",
      pending: ["Task 2 pending item 1", "Task 2 pending item 2"],
      completed: ["Task 2 completed item 1", "Task 2 completed item 2"]
    },
    {
      title: "Task 3",
      pending: ["Task 3 pending item 1", "Task 3 pending item 2"],
      completed: ["Task 3 completed item 1", "Task 3 completed item 2"]
    }
  ]); 
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
      {/* <AddTaskButton setOpenAddTask={setOpenAddTask} /> */}
    </>
  );
}
