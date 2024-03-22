import { Box } from "@mui/material";
import CollapsingList from "./CollapsingList";
import Info from "./Info";
import Logo from "./Logo";

export default function Sidebar({selectedOption,setSelectedOption}) {
  return (
    <Box
      sx={{
        width: "20%",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Logo />
      <Info />
      <CollapsingList selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
    </Box>
  );
}
