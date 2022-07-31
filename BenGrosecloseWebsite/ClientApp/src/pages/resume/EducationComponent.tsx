import React from 'react';
import { Box, Typography } from '@mui/material'
import { Education } from './models';

const EducationComponent = (education: Education) => {

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h6'>
          {education.school}
        </Typography>
        <Typography variant='body2'>
          {education.start} - {education.end}
        </Typography>
      </Box>
      <Typography variant='body2'>
        {education.degree}: {education.major}
      </Typography>
    </Box>
  );
}

export default EducationComponent;