import { Box, Typography, IconButton, Button } from "@mui/material";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import TodayIcon from "@mui/icons-material/Today";
import DeleteTask from "./DeleteTask";
import { format } from "date-fns";
import {
  AddCircleOutlineOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import SubTasks from "./SubTask";
import AddSubTask from "./AddSubTask";

export default function Tasks({
  task,
  index,
  toDoTasks,
  setToDoTasks,
  subTask,
  setSubTask,
  color,
}) {
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [openAddSubTask, setOpenAddSubTask] = useState(false);
  const todayDate = format(new Date(), "MMMM dd, yyyy");
  return (
    <>
      <Box
        m={2}
        sx={{
          width: subTask === index ? "100%" : "300px",
          height: subTask === index ? "500px" : "200px",
          borderRadius: "16px",
          backgroundColor: color.light,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
          transition: "width 1s ease, height 1s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TodayIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle2">{todayDate}</Typography>
          </Box>
          {subTask === -1 || subTask !== index ? (
            <IconButton
              aria-label="Expand"
              color="primary"
              onClick={() => setSubTask(index)}
            >
              <NorthEastIcon />
            </IconButton>
          ) : (
            <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
              <IconButton
                aria-label="Collapse"
                color="primary"
                onClick={() => setSubTask(-1)}
              >
                <NorthWestIcon />
              </IconButton>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: color.dark
                }}
                endIcon={<AddCircleOutlineOutlined />}
                onClick={() => setOpenAddSubTask(true)}
              >
                Add SubTask
              </Button>
            </Box>
          )}
        </Box>
        <Box
          display={"flex"}
          alignItems={"baseline"}
          onMouseEnter={() => setHoveredTitle(true)}
          onMouseLeave={() => setHoveredTitle(false)}
        >
          <Typography variant="h4" align="" gutterBottom>
            {task.title}
          </Typography>
          {hoveredTitle && (
            <IconButton
              size="small"
              title="Delete Task"
              onClick={() => setOpenDeleteTask(true)}
            >
              <DeleteOutlineOutlined color="error" />
            </IconButton>
          )}
        </Box>
        {subTask === index && (
          <SubTasks
            pending={task.pending}
            completed={task.completed}
            taskIndex={index}
            toDoTasks={toDoTasks}
            setToDoTasks={setToDoTasks}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">Created At - {task.createdAt}</Typography>
          <Typography variant="body2">
            {task.completed.length}/{task.pending.length+task.completed.length}
          </Typography>
        </Box>
      </Box>
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
          setSubTask={setSubTask}
        />
      )}
    </>
  );
}
