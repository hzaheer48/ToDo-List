import { Grid, Typography } from "@mui/material";

export default function Header() {
  return (
    <Grid container justifyContent="center" mt={5} mb={5}>
      <Grid item xs={10} sm={8}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: "#114232",
          }}
        >
          ToDo List
        </Typography>
      </Grid>
    </Grid>
  );
}
