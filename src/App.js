import ToDo from "./components/ToDo";
import { ThemeProvider, createTheme } from '@mui/material/styles'; 

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins, sans-serif', 
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToDo/>
    </ThemeProvider>
   
  );
}

export default App;
