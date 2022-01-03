import { AppBar, Button, IconButton, Toolbar, Typography, Box } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const MainMenu = (props) => {
  return (
    <Box id="main-menu">
      <AppBar color='primary'>
        <Toolbar>
          <Typography variant='h6' sx={{ marginRight: 2 }}>
            Ben Groseclose
          </Typography>
          <Button href='/' color='inherit'>Home</Button>
          <Button href='/resume' color='inherit'>Resume</Button>
          <Button href='/projects' color='inherit'>Projects</Button>

          <IconButton 
            href='https://github.com/BenjaminGroseclose' 
            target='_blank'
            color='inherit'
            sx={{ marginLeft: 'auto' }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            href='https://www.linkedin.com/in/benjamin-groseclose-953771113/'
            target='_blank'
            color='inherit'
          >
            <LinkedInIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MainMenu