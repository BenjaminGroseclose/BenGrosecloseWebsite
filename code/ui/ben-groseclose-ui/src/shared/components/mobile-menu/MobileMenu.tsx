import { AppBar, Toolbar, Typography, IconButton, Drawer, Button, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const MobileMenu = () => {
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<Box id="mobile-menu" sx={{ flexGrow: 1 }}>
			<AppBar color="primary">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => setOpenDrawer(!openDrawer)} sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h5" sx={{ marginRight: 2 }}>
						Ben Groseclose
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
				<Box sx={{ margin: 2, display: 'flex', flexDirection: 'column' }}>
					<Button href="/" color="inherit" sx={{ textAlign: 'left' }}>
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
					<Divider sx={{ marginTop: 1, marginBottom: 1 }} />
					<IconButton href="https://github.com/BenjaminGroseclose" target="_blank" color="inherit">
						<GitHubIcon />
					</IconButton>
					<IconButton href="https://www.linkedin.com/in/benjamin-groseclose-953771113/" target="_blank" color="inherit">
						<LinkedInIcon />
					</IconButton>
				</Box>
			</Drawer>
		</Box>
	);
};

export default MobileMenu;
