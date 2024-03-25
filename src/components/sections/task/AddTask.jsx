import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getCurrentTime } from "../../utils/Functions";
import { addDoc, collection, getDocs } from "@firebase/firestore"
import { firestore } from "../../utils/Connection";

export default function AddTask({ open, setOpen, setToDoTasks }) {
  const [taskTitle, setTaskTitle] = React.useState("");

  const handleAdd = async () => {
    if (taskTitle.trim() !== "") {
      const newTask = { title: taskTitle, createdAt: getCurrentTime() , pending: [], completed: [] };
      const ref = collection(firestore, "tasks")
      let data = newTask
      addDoc(ref, data);
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
      setTaskTitle("");
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskChange = (event) => {
    setTaskTitle(event.target.value);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle color={"#ab3003"}>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Please add your task title</DialogContentText>
          <TextField
            autoComplete="off"
            autoFocus
            required
            margin="dense"
            id="Task"
            name="Task"
            label="Task"
            type="text"
            fullWidth
            variant="outlined"
            value={taskTitle}
            onChange={handleTaskChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            type="submit"
            sx={{
              backgroundColor:"#fa963a"
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
