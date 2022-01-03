import { Box, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import MainMenu from './shared/components/main-menu/MainMenu';
import { deepOrange } from '@mui/material/colors';
import Resume from './pages/resume/Resume';
import Projects from './pages/projects/Projects';

function App() {
  const theme = createTheme({
    palette: {
      primary: deepOrange,
      mode: 'light'
    }
  })

  return (
    <Box 
      id="App"
      sx={{
        padding: '80px 3% 0 3%'
      }}
    >
      <ThemeProvider theme={theme}>
        <MainMenu />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  );
}

export default App;
