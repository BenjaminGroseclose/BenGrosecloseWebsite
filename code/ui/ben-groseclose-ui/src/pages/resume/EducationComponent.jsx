import React from 'react';
import { Box, Typography } from '@mui/material'

const Education = (props) => {

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h6'>
          {props.school}
        </Typography>
        <Typography variant='body2'>
          {props.start} - {props.end}
        </Typography>
      </Box>
      <Typography variant='body2'>
        {props.degree}: {props.major}
      </Typography>
    </Box>
  );
}

export default Education;