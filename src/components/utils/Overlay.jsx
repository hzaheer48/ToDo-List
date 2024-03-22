import { Box, Typography } from "@mui/material";
import BACKGROUND_IMAGE from "../../assets/images/background.jpg";
export default function Overlay({selectedOption}) {
  return (
    <Box
      sx={{
        height: "18vh",
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: "16px",
      }}
    >
      <Typography color="white" variant="caption">
        MENU / {selectedOption.title}
      </Typography>
      <Typography color="white" variant="h4">
        {selectedOption.title}
      </Typography>
    </Box>
  );
}
