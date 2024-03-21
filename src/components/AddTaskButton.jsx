import { Button, Grid } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function AddTaskButton({ setOpenAddTask }) {
  return (
    <Grid container justifyContent="center">
      <Grid mb={2} item xs={10} sm={8}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => setOpenAddTask(true)}
        >
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
}
