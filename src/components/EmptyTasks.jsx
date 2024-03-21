import { Box, Grid, Typography } from "@mui/material";

export default function EmptyTasks() {
  return (
    <Grid container justifyContent="center">
      <Grid
        mb={5}
        item
        xs={8}
        sm={7}
        padding={5}
        borderRadius="16px"
        display="flex"
        flexDirection="column"
        sx={{ backgroundColor: "#FCDC2A" }}
      >
        <Box display="flex" justifyContent="center">
          <Typography fontWeight="bold" variant="h6" component="div">
            Enter your daily tasks.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
