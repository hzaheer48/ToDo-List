import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import { Box, Button, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

const colors = [
  { iconColor: "#10cc52" },
  { iconColor: "#e91e63" },
  { iconColor: "#640436" },
];

export default function Activities({ activities }) {
  const [expandedActivityIndex, setExpandedActivityIndex] = React.useState(-1);

  const handleToggleExpand = (index) => {
    if (expandedActivityIndex === index) {
      setExpandedActivityIndex(-1);
    } else {
      setExpandedActivityIndex(index);
    }
  };

  return activities.length === 0 ? (
    <Box
      mt={5}
      sx={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {activities.map((activity, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {activity.createdAt}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: colors[index % 3].iconColor }}>
              <StarIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors[index % 3].iconColor,
                "&:hover": {
                  backgroundColor: colors[index % 3].iconColor,
                },
              }}
              endIcon={
                expandedActivityIndex === index ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              }
              onClick={() => handleToggleExpand(index)}
            >
              {activity.activity}
            </Button>
            <Collapse
              in={expandedActivityIndex === index}
              timeout={500}
              unmountOnExit
            >
              <Typography ml={2} mt={1}>
                <b>Type</b> : {activity.type}
              </Typography>
              <Typography ml={2} mt={1}>
                <b>Participants</b> : {activity.participants}
              </Typography>
              <Typography ml={2} mt={1}>
                <b>Price</b> : {activity.price}
              </Typography>
              <Typography ml={2} mt={1}>
                <b>Link</b> : {activity.link}
              </Typography>
              <Typography ml={2} mt={1}>
                <b>Key</b> : {activity.key}
              </Typography>
              <Typography ml={2} mt={1}>
                <b>Accessibility</b> : {activity.accessibility}
              </Typography>
            </Collapse>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
