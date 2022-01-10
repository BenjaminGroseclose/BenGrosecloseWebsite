import { Typography, Box, Chip, Divider } from '@mui/material';
import React from 'react';
import EducationComponent from './EducationComponent';
import ExperienceComponent from './ExperienceComponent';
import { Experience, Education } from './models';

const Resume = () => {

  const experience: Experience[] = [
    {
      company: 'Spectrum Health',
      start: 'April 2019',
      end: 'Present',
      title: 'Software Developer',
      descriptions: [
        'Using Angular 7 to create and support a patient portal website',
        'Developing efficient microservices using C# to provide value to several different applications.',
        'Supporting mobile development on both Android and iOS platforms with Java, Kotlin, and Swift.',
        'Working in an agile development environment following SAFe methodologies.',
        'Worked with Twilio to create a fully customizable appointment reminder system.',
        'Used AWS CDK to configure new cloud-native applications.',
        'Created an admin portal to maintain internal application with React.'
      ]
    },
    {
      company: 'Amrock',
      start: 'May 2018',
      end: 'Feb 2019',
      title: 'Software Developer Intern',
      descriptions: [
        'Provided new features to Amrock’s mobile application using Java and Kotlin.',
        'Sought ways to improve the agile team’s process and the in-house mobile and windows Applications.',
        'Addressed tech debt within the applications and worked towards proper architecture.',
        'Contributed to implementing a C# Microservices using ASP.NET.',
        'Developed on an enterprise ESCROW Windows Application using C#.',
        'Worked with the business to gather requirements and transform them into Agile stories.'
      ]
    }
  ]

  const education: Education[] = [
    {
      school: 'Grand Valley State Univesity',
      start: 'Jan 2021',
      end: 'Present',
      degree: "Master's Degree",
      major: 'Applied Computer Science'
    },
    {
      school: 'Central Michigan University',
      start: 'Sept 2013',
      end: 'May 2018',
      degree: "Bachelor's Degree",
      major: 'Computer Science'
    }
  ]

  return (
    <Box id="resume">
      <Typography variant='h4'>
        Skills
      </Typography>
      <Box>
        <Chip label="C#" variant='filled' sx={{ margin: 1 }} />
        <Chip label=".NET" variant='filled' sx={{ margin: 1 }} />
        <Chip label="ASP .NET" variant='filled' sx={{ margin: 1 }} />
        <Chip label="Angular" variant='filled' sx={{ margin: 1 }} />
        <Chip label="React" variant='filled' sx={{ margin: 1 }} />
        <Chip label="Android Development" variant='filled' sx={{ margin: 1 }} />
        <Chip label="Java" variant='filled' sx={{ margin: 1 }} />
        <Chip label="Kotlin" variant='filled' sx={{ margin: 1 }} />
        <Chip label="Python" variant='filled' sx={{ margin: 1 }} />
        <Chip label="Agile" variant='filled' sx={{ margin: 1 }} />
        <Chip label="SAFe" variant='filled' sx={{ margin: 1 }} />
        <Chip label="AWS" variant='filled' sx={{ margin: 1 }} />
        <Chip label="AWS CDK" variant='filled' sx={{ margin: 1 }} />
        <Chip label="Git" variant='filled' sx={{ margin: 1 }} />
        <Chip label="Twilio" variant='filled' sx={{ margin: 1 }} />
      </Box>
      <Typography variant='h4' sx={{ marginTop: 2 }}>
        Experience
      </Typography>
      {
        experience.map((exp, i) => (
          <Box key={i}>
            <ExperienceComponent 
              company={exp.company}
              start={exp.start}
              end={exp.end}
              title={exp.title}
              descriptions={exp.descriptions}
            />
            { experience.length - 1 !== i ? <Divider /> : <span></span> }
          </Box>
        ))
      }
      <Typography variant='h4' sx={{ marginTop: 2 }}>
        Education
      </Typography>
      <Box>
      {
        education.map((edu, i) => (
          <Box key={i}>
            <EducationComponent 
              school={edu.school}
              start={edu.start}
              end={edu.end}
              degree={edu.degree}
              major={edu.major}
            />
            { education.length - 1 !== i ? <Divider /> : <span></span> }
          </Box>
        ))
      }
      </Box>
    </Box>
  )
}

export default Resume;