import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { arrayRemove, collection, doc, getDoc, getDocs, updateDoc } from "@firebase/firestore";
import { firestore } from "../../utils/Connection";

export default function DeleteSubTask({
  open,
  setOpen,
  setToDoTasks,
  id,
  index,
}) {
  const [deleteButtonClicked,setDeleteButtonClicked] = React.useState(false);
  const handleDelete = async () => {
    setDeleteButtonClicked(true)
    const docRef = doc(firestore, "tasks", id);
    const docSnap = await getDoc(docRef);
    const taskTitle = docSnap.data().completed[index]
    await updateDoc(docRef, {
      completed: arrayRemove(taskTitle)
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
    setDeleteButtonClicked(true);
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
