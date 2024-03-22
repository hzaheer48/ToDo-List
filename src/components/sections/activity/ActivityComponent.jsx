import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import Activities from "./Activities";
import axios from "axios";
import { useState } from "react";
import { getCurrentTime } from "../../utils/Functions";

export default function ActivityComponent({ activities, setActivities }) {
  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);

  const handleGenerateActivity = async () => {
    setGenerateButtonClicked(true);
    try {
      const response = await axios.get("https://www.boredapi.com/api/activity");
      const result = {...response.data,"createdAt":getCurrentTime()}
      setActivities([...activities, result]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setGenerateButtonClicked(false);
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Box mt={5}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="body1" fontWeight={"bold"}>
            Total Activities:{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              padding: "10px",
              backgroundColor: "#efefef",
              borderRadius: "10px",
              marginLeft: "5px",
            }}
          >
            {activities.length}
          </Typography>
        </Box>
      </Box>

      <Box mt={3}>
        <Box display={"flex"} alignItems={"center"}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fa963a",
              "&:hover": {
                backgroundColor: "#fa963a",
              },
            }}
            endIcon={generateButtonClicked ? <CircularProgress size={20}/> : <AddCircleOutlineOutlined />}
            onClick={handleGenerateActivity}
            disabled={generateButtonClicked}
          >
            {generateButtonClicked ? "Pleas wait!" : "Generate Activity"}
          </Button>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"start"}>
        <Activities activities={activities} />
      </Box>
    </Box>
  );
}
