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
          Hello, my name is Ben Groseclose. I am from the great state of Michigan.  I currently reside in West Michigan 
          with my wife of 4 years and our son Luke, a recent addition to the family. Some things I enjoy include sports, 
          video games, technolog, and board games. Currently, I work for Spectrum Health as a software developer helping 
          to maintain their patient communication system and others. Previously, I worked for Amrock, a sister-company of 
          Quicken Loans. I have a bachelor's degree from Central Michigan University and I am currently enrolled at Grand 
          Valley State University, pursing a graduate degree in Applied Computer Science.
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