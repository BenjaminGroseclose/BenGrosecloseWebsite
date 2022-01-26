import { Box, createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/home/Home';
import MainMenu from './shared/components/main-menu/MainMenu';
import { deepOrange } from '@mui/material/colors';
import Resume from './pages/resume/Resume';
import Projects from './pages/projects/Projects';
import { useState, useEffect } from 'react';
import MobileMenu from './shared/components/mobile-menu/MobileMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChessPage from './pages/chess/Chess';
import Footer from './shared/components/footer/Footer';

function App() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  const theme = createTheme({
    palette: {
      primary: deepOrange,
      mode: 'light'
    }
  })

  return (
    <Box id="App">
      <ThemeProvider theme={theme}>
        { isDesktop ? <MainMenu/> : <MobileMenu /> }
        
        <Box sx={{ padding: '80px 3% 0 3%'}}>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/chess" element={<ChessPage />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
