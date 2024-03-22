import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteSubTask({
  open,
  setOpen,
  toDoTasks,
  setToDoTasks,
  index,
  taskIndex,
}) {
  const handleDelete = () => {
    const updatedTasks = [...toDoTasks];
    const taskToUpdate = updatedTasks[taskIndex];
    taskToUpdate.completed.splice(index, 1);
    setToDoTasks(updatedTasks);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color={"error"}>
          {"Delete SubTask"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you certain you wish to delete this subtask?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
