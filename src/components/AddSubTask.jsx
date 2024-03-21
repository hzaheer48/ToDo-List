import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddSubTask({
  open,
  setOpen,
  toDoTasks,
  setToDoTasks,
  index,
}) {
  const [taskTitle, setTaskTitle] = React.useState("");

  const handleAdd = () => {
    if (taskTitle.trim() !== "") {
      const updatedTasks = [...toDoTasks];
      const taskToUpdate = updatedTasks[index];
      taskToUpdate.pending.push(taskTitle);
      setToDoTasks(updatedTasks);
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
        <DialogTitle color={"green"}>Add SubTask</DialogTitle>
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
            variant="contained"
            color="success"
            type="submit"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
