import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {doc, deleteDoc, getDocs, collection} from "firebase/firestore";
import { firestore } from "../../utils/Connection";

export default function DeleteTask({
  open,
  setOpen,
  setToDoTasks,
  id,
  setSubTask
}) {
  const [deleteButtonClicked,setDeleteButtonClicked] = React.useState(false);
  const handleDelete = async () => {
    setDeleteButtonClicked(true);
    const docRef = doc(firestore, "tasks", id);
    await deleteDoc(docRef);
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
    setDeleteButtonClicked(false);
    setSubTask(-1);
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
          {"Delete Task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you certain you wish to delete this task? Please keep in mind
            that its subtasks will also be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={deleteButtonClicked}
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
