import { Box, createTheme, PaletteMode, Paper, ThemeProvider } from '@mui/material';
import Home from './pages/home/Home';
import MainMenu from './shared/components/main-menu/MainMenu';
import { blue, deepOrange } from '@mui/material/colors';
import Resume from './pages/resume/Resume';
import Projects from './pages/projects/Projects';
import React, { useState, useEffect } from 'react';
import MobileMenu from './shared/components/mobile-menu/MobileMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChessPage from './pages/chess/Chess';
import OnlineChessPage from './pages/chess/OnlineChess';
import Ringer from './pages/ringer/Ringer';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
	const [isDesktop, setIsDesktop] = useState(false);
	const [mode, setMode] = React.useState<PaletteMode>(window.sessionStorage.getItem('mode') ? (window.sessionStorage.getItem('mode') as PaletteMode) : 'light');
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			}
		}),
		[]
	);

	useEffect(() => {
		window.sessionStorage.setItem('mode', mode);
	}, [mode]);

	useEffect(() => {
		const media = window.matchMedia('(min-width: 900px)');
		const listener = () => setIsDesktop(media.matches);
		listener();
		window.addEventListener('resize', listener);

		return () => window.removeEventListener('resize', listener);
	}, [isDesktop]);

	const theme = createTheme({
		// palette: {
		// 	primary: deepOrange,
		// 	secondary: green,
		// 	mode: isDark ? 'dark' : 'light'
		// }
		palette: {
			mode: mode,
			...(mode
				? {
						primary: deepOrange,
						secondary: blue
				  }
				: {
						primary: deepOrange,
						secondary: blue
				  })
		}
	});

	const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
	const url = baseUrl !== null ? baseUrl : '';

	return (
		<Box id="App">
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					{isDesktop ? <MainMenu mode={mode} colorMode={colorMode} /> : <MobileMenu mode={mode} colorMode={colorMode} />}

					<Paper sx={{ padding: '80px 3% 0 3%', height: 'calc(100vh - 80px)' }}>
						<BrowserRouter basename={url}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/resume" element={<Resume />} />
								<Route path="/projects" element={<Projects />} />
								<Route path="/chess" element={<ChessPage />} />
								<Route path="/chess/:gameId" element={<OnlineChessPage />} />
								<Route path="/ringer" element={<Ringer />} />
							</Routes>
						</BrowserRouter>
					</Paper>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</Box>
	);
}

export default App;
