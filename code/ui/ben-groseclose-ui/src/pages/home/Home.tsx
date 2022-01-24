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
          Hello, my name is Ben Groseclose. I am from the great state of Michigan. I live here
          with my wife of 4 years and our son Luke, a recent addition to the family. Some things I enjoy include sports, 
          video games, technology, and board games. Currently, I work for Spectrum Health as a software developer helping 
          to maintain their patient communication system and other applications. Previously, I worked for Amrock, a sister-company of 
          Quicken Loans as software developer intern. I have a bachelor's degree from Central Michigan University 
          and I am currently enrolled at Grand Valley State University, pursuing a graduate degree in Applied Computer Science.

          <br /><br />

          I enjoy spending time with my family especially when we get together at Disney or our family island. My wife's family has been 
          going to Disney since I have known them, and I have come to enjoy my time there. Whether it is going to splash mountain
          or eating amazing food around Epcot it is always a good time. My family island based in the St. Lawerence river is a small 
          5 acres with an old wooden cabin on it. I have gone there since I was young and hope to continue to go in the future.

        </Typography>
        <img src='./images/family.jpg' alt='Family' style={{ maxWidth: '400px', margin: 'auto' }} />
      </Box>
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <Box>
        <Typography variant='h5'>
          Career
        </Typography>
        <Box>
          <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
            <u>Spectrum Health</u>
          </Typography>

          <Typography variant='body1'>
            I started at Spectrum Health in early 2019, where they were just kicking off the redesign of their patient portal. The 
            portal was written in Angular 7 with an ASP.NET core microservice backend. We also implemented SAFe which is an 
            agile methodology to help enterprises align around value. The patient portal was eventually retired and my team move to
            work on a patient communication system. The main objective was appointment reminder but since has expanded to all 
            sorts of other communications. The system was built with Twilio as our Sms and Voice vendor. We created a C# cron job
            processing system that handles our daily communications. We currently are in the process of transitioning to AWS. We 
            are using their CDK (Cloud Development Kit) to write infrastructure as code. 
          </Typography>

          <Typography variant='subtitle1' sx={{ marginBottom: 2, marginTop: 2 }}>
            <u>Amrock</u>
          </Typography>

          <Typography variant='body1'>
          After I graduated from CMU I started my job at Amrock as a software developer intern. There I worked on a team of other interns
            as well as a team of experienced developers working on an in-house windows application created using C#. The internship was expected
            to only last the summer however, they extended me hoping to convert me to full-time eventually. I moved to a different team at that
            time and started to work more on their Android application while also supporting their windows application still. I eventually
            became the main developer for one of their mobile applications. In early 2019 I moved to Spectrum Health as I did not see 
            my internship moving into a full-time position as quickly as I had originally hoped.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Home;