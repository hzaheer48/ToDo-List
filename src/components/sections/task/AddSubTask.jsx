import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../../utils/Connection";

export default function AddSubTask({
  open,
  setOpen,
  setToDoTasks,
  id,
}) {
  const [addButtonClicked,setAddButtonClicked] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState("");

  const handleAdd = async () => {
    if (taskTitle.trim() !== "") {
      setAddButtonClicked(true)
      const docRef = doc(firestore, "tasks", id);
      await updateDoc(docRef, {
        pending: arrayUnion(taskTitle)
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
      setTaskTitle("");
      setAddButtonClicked(true);
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
        <DialogTitle color={"#ab3003"}>Add SubTask</DialogTitle>
        <DialogContent>
          <DialogContentText>Please add your subtask title</DialogContentText>
          <TextField
            autoComplete="off"
            autoFocus
            required
            margin="dense"
            id="SubTask"
            name="SubTask"
            label="SubTask"
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
            disabled={addButtonClicked}
            variant="contained"
            sx={{
              backgroundColor:"#fa963a"
            }}
            type="submit"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
