import React from 'react';
import { Box, Typography } from '@mui/material'
import { Experience } from './models';

const ExperienceComponent = (experience: Experience) => {

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h6'>
          {experience.company}
        </Typography>
        <Typography variant='body2'>
          {experience.start} - {experience.end}
        </Typography>
      </Box>
      <Typography variant='subtitle1'>
        {experience.title}
      </Typography>
      {experience.descriptions.map((desc, i) => (
        <Typography key={i} variant='body2' sx={{ marginTop: 1 }}>
          - {desc}
        </Typography>
      ))}
    </Box>
  );
}

export default ExperienceComponent