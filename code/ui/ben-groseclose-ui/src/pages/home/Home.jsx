import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Home = () => {
  return (
    <Box id="home">
      <Typography variant='h5'>
        About Me
      </Typography>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'space-evenly', sm: 'space-evenly' },
          marginTop: 3
        }}
      >
        <Typography 
          variant='body1'
          sx={{
            marginRight: { xs: 0, md: 6 },
            marginBottom: { xs: 3, md: 0 }
          }}
        >
          Hello my name is Ben Groseclose, I am from and still live in the great state of Michigan. 
          Specifically West Olive a small town just outside of Grand Rapids, Michigan.
          I have been married for 4 years and we recently had our first child, Luke. Some of my hobbies 
          include sports, video games, technology, and board games. Professionally I currently work for
          Spectrum Health as a software developer helping to maintain their Patient Communication system 
          and others applications. Previously I worked for Amrock, a sister company of Quicken Loans 
          in Detroit. I am currently enrolled at Grand Valley State University for my graduate degree 
          in applied computer science. My bachelors degree however comes from Central Michigan University.
        </Typography>
        <img src='./images/family.jpg' alt='Family' style={{ maxWidth: '400px', margin: 'auto' }} />
      </Box>
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <Box>
        <Typography variant='h5'>
          Contact Me
        </Typography>
        <Typography variant='body1'>

        </Typography>
      </Box>
    </Box>
  )
}

export default Home;