import { Typography, Box, Link, Divider } from '@mui/material';
import React from 'react';
import ContactMe from '../../shared/components/contact-me/ContactMe';

const Projects = () => {
  return (
    <Box id="projects">
      <Typography variant='h5'>
        Projects Page
      </Typography>
      <Typography sx={{ marginTop: 3 }} variant='h6'>
        Personal Website
      </Typography>
      <Typography variant='body1'>
        Overview: React App hosted with AWS S3 and Cloudfront.
        <br/>
        <img src="./images/WebsiteArchitecture.png" alt='Personal website architectural diagram' width={500} />
        <br/><br/>
        <Link  color='inherit' href='https://github.com/BenjaminGroseclose/BenGrosecloseWebsite' target='_blank' >Github Repository</Link>
      </Typography>
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <ContactMe />
    </Box>
  )
}

export default Projects;