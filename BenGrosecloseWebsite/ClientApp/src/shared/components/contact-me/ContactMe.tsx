import { Box, Typography } from '@mui/material';
import React from 'react';

const ContactMe = () => {
  return (
    <Box id='contact-me'>
      <Typography variant='h5'>
        Contact Me
      </Typography>
      <Typography>
        Email: <a href="mailto:ben.groseclose01@gmail.com">ben.groseclose01@gmail.com</a>
        <br/>
        <a href='https://www.linkedin.com/in/benjamin-groseclose-953771113/' rel='noreferrer' target='_blank'>LinkedIn</a>
      </Typography>
    </Box>
  )
}

export default ContactMe;