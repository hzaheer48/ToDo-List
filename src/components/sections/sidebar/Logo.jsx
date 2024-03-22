import { Typography } from "@mui/material";

export default function Logo() {
    return (
      <>
        <Typography
          pt={5}
          ml={2}
          variant="h5"
          color="black"
          textAlign="justify"
          component="div"
        >
          <span style={{ color: "#ab3003" }}>Task</span>mate
        </Typography>
        <Typography
          ml={2}
          mb={3}
          variant="caption"
          color="#333333"
          component="div"
        >
          Focus, Prioritize, Execute
        </Typography>
      </>
    );
  }
  