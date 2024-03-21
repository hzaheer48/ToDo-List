import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import DeleteTask from "./DeleteTask";
import AddSubTask from "./AddSubTask";
import DeleteSubTask from "./DeleteSubTask";

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

const PendingAndCompletedList = ({
  pending,
  completed,
  toDoTasks,
  setToDoTasks,
  taskIndex,
}) => {
  const finalArray = mergeArrays(pending, completed);
  const [openDeleteSubTask, setOpenDeleteSubtask] = useState(false);
  const [subTaskIndex, setSubTaskIndex] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handlePendingTaskClicked = (task, index) => {
    const updatedTasks = [...toDoTasks];
    const taskToUpdate = updatedTasks[taskIndex];
    taskToUpdate.pending.splice(index, 1);
    taskToUpdate.completed.push(task);
    setToDoTasks(updatedTasks);
  };

  const handleCompletedTaskClicked = (task, index) => {
    const updatedTasks = [...toDoTasks];
    const taskToUpdate = updatedTasks[taskIndex];
    taskToUpdate.completed.splice(index, 1);
    taskToUpdate.pending.push(task);
    setToDoTasks(updatedTasks);
  };

  const handleDeleteSubTask = (index) => {
    setSubTaskIndex(index);
    setOpenDeleteSubtask(true);
  };

  return (
    <>
      {finalArray.map((task, index) => (
        <Box display="flex" justifyContent="space-between" key={index}>
          <Tooltip title="Click to mark as completed">
            <Typography
              mb={2}
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
            alignItems={"start"}
            justifyContent={"start"}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Tooltip title="Click to mark as pending">
              <Typography
                mb={2}
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

            {/* {hoveredIndex === index && (
              <IconButton
                size="small"
                title="Delete SubTask"
                onClick={() => handleDeleteSubTask(index)}
              >
                <DeleteOutlineOutlinedIcon color="error" />
              </IconButton>
            )} */}
          </Box>
        </Box>
      ))}
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold" variant="body2" component="div">
          Total Pending : {pending.length}
        </Typography>
        <Typography fontWeight="bold" variant="body2" component="div">
          Total Completed : {completed.length}
        </Typography>
      </Box>
      {openDeleteSubTask && (
        <DeleteSubTask
          open={openDeleteSubTask}
          setOpen={setOpenDeleteSubtask}
          toDoTasks={toDoTasks}
          setToDoTasks={setToDoTasks}
          taskIndex={taskIndex}
          index={subTaskIndex}
        />
      )}
    </>
  );
};

export default function Task({ task, index, toDoTasks, setToDoTasks }) {
  const strikeThrough =
    task.pending.length + task.completed.length !== 0 &&
    task.completed.length === task.pending.length + task.completed.length
      ? true
      : false;
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [openAddSubTask, setOpenAddSubTask] = useState(false);

  const handleDeleteTask = () => {
    setOpenDeleteTask(true);
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          mb={5}
          item
          xs={10}
          sm={7}
          padding={3}
          borderRadius="16px"
          display="flex"
          flexDirection="column"
          sx={{ backgroundColor: "#FCDC2A" }}
        >
          <Box mb={2} display="flex" justifyContent="space-between" sx={{ flexDirection : { xs : 'column', md:'row' }}}>
            <Typography
              variant="h5"
              component="div"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              mb={2}
              onMouseEnter={() => setHoveredTitle(true)}
              onMouseLeave={() => setHoveredTitle(false)}
              sx={{
                cursor: "pointer",
                color: "#114232",
              }}
            >
              {strikeThrough ? <s>{task.title}</s> : task.title}
              {/* {hoveredTitle && (
                <IconButton
                  size="small"
                  title="Delete Task"
                  onClick={handleDeleteTask}
                >
                  <DeleteOutlineOutlinedIcon color="error" />
                </IconButton>
              )} */}
            </Typography>
            {/* <Button
              variant="contained"
              color="success"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={() => setOpenAddSubTask(true)}
            >
              Add SubTask
            </Button> */}
          </Box>

          {task.pending.length === 0 && task.completed.length === 0 ? (
            <Box display="flex" justifyContent="center">
              <Typography fontWeight="bold" variant="h6" component="div">
                Enter SubTasks to your Task
              </Typography>
            </Box>
          ) : (
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight="bold" variant="h6" component="div">
                  Pending
                </Typography>
                <Typography fontWeight="bold" variant="h6" component="div">
                  Completed
                </Typography>
              </Box>
              <PendingAndCompletedList
                pending={task.pending}
                completed={task.completed}
                taskIndex={index}
                toDoTasks={toDoTasks}
                setToDoTasks={setToDoTasks}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      {openAddSubTask && (
        <AddSubTask
          open={openAddSubTask}
          setOpen={setOpenAddSubTask}
          toDoTasks={toDoTasks}
          setToDoTasks={setToDoTasks}
          index={index}
        />
      )}
      {openDeleteTask && (
        <DeleteTask
          open={openDeleteTask}
          setOpen={setOpenDeleteTask}
          toDoTasks={toDoTasks}
          setToDoTasks={setToDoTasks}
          index={index}
        />
      )}
    </>
  );
}
