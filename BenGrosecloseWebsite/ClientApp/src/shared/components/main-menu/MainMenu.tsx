import { AppBar, Button, IconButton, Toolbar, Typography, Box, PaletteMode } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export interface IMainMenuProps {
	mode: PaletteMode;
	colorMode: { toggleColorMode(): void };
}

const MainMenu = ({ mode, colorMode }: IMainMenuProps) => {
	return (
		<Box id="main-menu" sx={{ flexGrow: 1 }}>
			<AppBar color="primary">
				<Toolbar>
					<Typography variant="h5" sx={{ marginRight: 2 }}>
						Ben Groseclose
					</Typography>
					<Button href="/" color="inherit">
						Home
					</Button>
					<Button href="/resume" color="inherit">
						Resume
					</Button>
					<Button href="/projects" color="inherit">
						Projects
					</Button>
					<Button href="/chess" color="inherit">
						Chess
					</Button>

					<IconButton sx={{ marginLeft: 'auto' }} onClick={colorMode.toggleColorMode} color="inherit">
						{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
					<IconButton href="https://github.com/BenjaminGroseclose" target="_blank" color="inherit">
						<GitHubIcon />
					</IconButton>
					<IconButton href="https://www.linkedin.com/in/benjamin-groseclose-953771113/" target="_blank" color="inherit">
						<LinkedInIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default MainMenu;
