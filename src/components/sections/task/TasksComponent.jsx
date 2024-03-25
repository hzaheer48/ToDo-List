import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import { useState } from "react";

const colors = [
  { light: "#c8eaf8", dark: "#3a6c84" },
  { light: "#f8dfc8", dark: "#7e5b3d" },
  { light: "#85ed8a", dark: "#2e6e30" },
  { light: "#edbcf5", dark: "#6e3e68" },
];

const calculateTaskStats = (tasks) => {
  let totalTasks = tasks.length;
  let totalPendingTasks = 0;
  let totalCompletedTasks = 0;
  tasks.forEach((task) => {
    totalPendingTasks += task.pending.length;
    totalCompletedTasks += task.completed.length;
  });

  return {
    totalTasks,
    totalPendingTasks,
    totalCompletedTasks,
  };
};

export default function TaskComponent({
  toDoTasks,
  setToDoTasks,
  loadingTasks,
}) {
  const [subTask, setSubTask] = useState(-1);
  const [openAddTask, setOpenAddTask] = useState(false);
  const taskStats = calculateTaskStats(toDoTasks);
  return (
    <>
      {loadingTasks ? (
         <Box sx={{marginTop: "30px" , display: 'flex', justifyContent:'center'}}>
         <CircularProgress size={70}/>
       </Box>
      ) : (
        <Box sx={{ padding: "16px" }}>
          <Box display={"flex"}>
            <Box mr={2}>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Total Tasks:{" "}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    padding: "10px",
                    backgroundColor: "#efefef",
                    borderRadius: "10px",
                    marginLeft: "5px",
                  }}
                >
                  {taskStats.totalTasks}
                </Typography>
              </Box>
            </Box>
            <Box mr={2}>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Pending:{" "}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    padding: "10px",
                    backgroundColor: "#f8dfc8",
                    borderRadius: "10px",
                    marginLeft: "5px",
                  }}
                >
                  {taskStats.totalPendingTasks}
                </Typography>
              </Box>
            </Box>
            <Box mr={2}>
              <Box display={"flex"} alignItems={"center"}>
                <Typography variant="body1" fontWeight={"bold"}>
                  Completed:{" "}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    padding: "10px",
                    backgroundColor: "#c8eaf8",
                    borderRadius: "10px",
                    marginLeft: "5px",
                  }}
                >
                  {taskStats.totalCompletedTasks}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={3}>
            <Box display={"flex"} alignItems={"center"}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#fa963a" }}
                endIcon={<AddCircleOutlineOutlined />}
                onClick={() => {
                  setSubTask(-1);
                  setOpenAddTask(true);
                }}
              >
                NEW TASK
              </Button>
            </Box>
          </Box>
          {toDoTasks.length === 0 ? (
            <Box display="flex" justifyContent={"center"}>
              <Typography
                variant="h6"
                color={"text.secondary"}
                component={"div"}
              >
                Please add your daily tasks.
              </Typography>
            </Box>
          ) : (
            <Box display="flex" flexWrap="wrap">
              {toDoTasks.map((task, index) => (
                <Tasks
                  key={index}
                  task={task}
                  index={index}
                  setToDoTasks={setToDoTasks}
                  subTask={subTask}
                  setSubTask={setSubTask}
                  color={colors[index % 4]}
                />
              ))}
            </Box>
          )}
        </Box>
      )}
      {openAddTask && (
        <AddTask
          open={openAddTask}
          setOpen={setOpenAddTask}
          setToDoTasks={setToDoTasks}
        />
      )}
    </>
  );
}
