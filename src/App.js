import Home from "./components/Home";
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

      <Home/>
    </ThemeProvider>
   
  );
}

export default App;
