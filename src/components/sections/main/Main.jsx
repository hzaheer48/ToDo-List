import { Box } from "@mui/material";
import Overlay from "../../utils/Overlay";
import TaskComponent from "../task/TasksComponent";
import ActivityComponent from "../activity/ActivityComponent";

export default function Main({ selectedOption,toDoTasks,setToDoTasks,activities,setActivities }) {
  return (
    <Box width={"80%"} display={"flex"} flexDirection={"column"}>
      <Overlay selectedOption={selectedOption} />
      {selectedOption.id === 0 ? (
        <TaskComponent toDoTasks={toDoTasks} setToDoTasks={setToDoTasks}/>
      ) : (
        <ActivityComponent
          activities={activities}
          setActivities={setActivities}
        />
      )}
    </Box>
  );
}
