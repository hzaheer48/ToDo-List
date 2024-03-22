import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "./sections/sidebar/Sidebar";
import Main from "./sections/main/Main";
import { getCurrentTime } from "./utils/Functions";

export default function Home() {
  const [selectedOption , setSelectedOption] = useState({
    id : 0 ,
    title : "Tasks"
  });
  const [activities, setActivities] = useState([]);
  const [toDoTasks, setToDoTasks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.boredapi.com/api/activity"
        );
        const result = {...response.data,"createdAt":getCurrentTime()}
        setActivities([...activities, result]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box display={"flex"}>
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      <Main selectedOption={selectedOption} toDoTasks={toDoTasks} setToDoTasks={setToDoTasks} activities={activities} setActivities={setActivities}/>
    </Box>
  );
}
