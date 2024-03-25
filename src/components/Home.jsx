import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "./sections/sidebar/Sidebar";
import Main from "./sections/main/Main";
import { getCurrentTime } from "./utils/Functions";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./utils/Connection";

export default function Home() {
  const [selectedOption , setSelectedOption] = useState({
    id : 0 ,
    title : "Tasks"
  });
  const [activities, setActivities] = useState([]);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [loadingTasks,setLoadingTasks] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.boredapi.com/api/activity"
        );
        const result = {...response.data,"createdAt":getCurrentTime()}
        setActivities([...activities, result]);
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
        setLoadingTasks(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box display={"flex"}>
      <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      <Main selectedOption={selectedOption} toDoTasks={toDoTasks} setToDoTasks={setToDoTasks} loadingTasks={loadingTasks} activities={activities} setActivities={setActivities}/>
    </Box>
  );
}
