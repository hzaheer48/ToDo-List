import { Box, Typography } from "@mui/material";
import Avatars from "../../utils/Avatar";

export default function Info() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          margin: "0 auto",
          width: "90%",
          height: "60px",
          border: "1px solid #a7a7a7",
          borderRadius: "16px",
          marginBottom: "30px",
        }}
      >
        <Avatars />
        <Box>
          <Typography
            ml={1}
            variant="body2"
            color="black"
            component="div"
            fontWeight={"bold"}
          >
            Hammad Zaheer
          </Typography>
          <Typography ml={1} variant="caption" color="inherit" component="div">
            hammad.zaheer@bitsol.tech
          </Typography>
        </Box>
      </Box>
    </>
  );
}
