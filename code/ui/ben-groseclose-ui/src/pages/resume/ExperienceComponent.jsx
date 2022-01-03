import React from 'react';
import { Box, Typography } from '@mui/material'

const Experience = (props) => {

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h6'>
          {props.company}
        </Typography>
        <Typography variant='body2'>
          {props.start} - {props.end}
        </Typography>
      </Box>
      <Typography variant='subtitle1'>
        {props.title}
      </Typography>
      {props.descriptions.map((desc, i) => (
        <Typography key={i} variant='body2' sx={{ marginTop: 1 }}>
          - {desc}
        </Typography>
      ))}
    </Box>
  );
}

export default Experience