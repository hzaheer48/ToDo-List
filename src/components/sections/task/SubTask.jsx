import React, { useState } from "react";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import DeleteSubTask from "./DeleteSubTask";
import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from "@firebase/firestore";
import { firestore } from "../../utils/Connection";

const mergeArrays = (pending, completed) => {
  const maxLength = Math.max(pending.length, completed.length);
  const finalArray = [];
  for (let i = 0; i < maxLength; i++) {
    const pendingValue = pending[i] || "";
    const completedValue = completed[i] || "";
    finalArray.push({ pending: pendingValue, completed: completedValue });
  }
  return finalArray;
};

export default function SubTasks({
  pending,
  completed,
  id,
  setToDoTasks,
}) {
  const finalArray = mergeArrays(pending, completed);
  const [openDeleteSubTask, setOpenDeleteSubTask] = useState(false);
  const [subTaskIndex, setSubTaskIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handlePendingTaskClicked = async (task) => {
    const docRef = doc(firestore, "tasks", id);
    await updateDoc(docRef, {
      pending: arrayRemove(task),
      completed : arrayUnion(task)
    });
    const tasksArray = [];
    const querySnapshot = await getDocs(collection(firestore, "tasks"));
    querySnapshot.forEach((doc) => {
      const singleTask = {
        id : doc.id,
        ...doc.data()
      }
      tasksArray.push(singleTask);
    });
    setToDoTasks(tasksArray);
  };

  const handleCompletedTaskClicked = async (task) => {
    const docRef = doc(firestore, "tasks", id);
    await updateDoc(docRef, {
      pending: arrayUnion(task),
      completed : arrayRemove(task)
    });
    const tasksArray = [];
    const querySnapshot = await getDocs(collection(firestore, "tasks"));
    querySnapshot.forEach((doc) => {
      const singleTask = {
        id : doc.id,
        ...doc.data()
      }
      tasksArray.push(singleTask);
    });
    setToDoTasks(tasksArray);
  };

  const handleDeleteSubTask = (index) => {
    setSubTaskIndex(index);
    setOpenDeleteSubTask(true);
  };

  return (
    <>
      {finalArray.length === 0 ? (
        <Box display="flex" justifyContent="center">
          <Typography variant="h6" color="text.secondary" component="div">
            Please add your daily sub-tasks.
          </Typography>
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-between">
          <Typography mb={1} variant="h6" fontWeight="bold" component="div">
            Pending
          </Typography>
          <Typography mb={1} variant="h6" fontWeight="bold" component="div">
            Completed
          </Typography>
        </Box>
      )}
      {finalArray.map((task, index) => (
        <Box display="flex" justifyContent="space-between" key={index}>
          <Tooltip title="Click to mark as completed">
            <Typography
              mb={1}
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => handlePendingTaskClicked(task.pending, index)}
            >
              {task.pending}
            </Typography>
          </Tooltip>
          <Box
            display="flex"
            alignItems="start"
            justifyContent="start"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Tooltip title="Click to mark as pending">
              <Typography
                mb={1}
                variant="h6"
                component="div"
                onClick={() =>
                  handleCompletedTaskClicked(task.completed, index)
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                {task.completed}
              </Typography>
            </Tooltip>
            {hoveredIndex === index && (
              <IconButton
                size="small"
                title="Delete SubTask"
                onClick={() => handleDeleteSubTask(index)}
              >
                <DeleteOutlineOutlined color="error" />
              </IconButton>
            )}
          </Box>
        </Box>
      ))}
      {openDeleteSubTask && (
        <DeleteSubTask
          open={openDeleteSubTask}
          setOpen={setOpenDeleteSubTask}
          setToDoTasks={setToDoTasks}
          id = {id}
          index={subTaskIndex}
        />
      )}
    </>
  );
}
