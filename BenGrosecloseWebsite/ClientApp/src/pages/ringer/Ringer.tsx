import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ITeamStanding } from './models';
import MultiYearTab from './MultiYearTab';
import SkinsGame from './SkinsGame';
import { TabPanel } from './TabPanel';

const Ringer = () => {
	const [value, setValue] = useState(0);
	let [year] = useState<number>(2023);
	let [teamStandings, setTeamStandings] = useState<ITeamStanding[]>([]);

	useEffect(() => {
		axios.get<ITeamStanding[]>(`/api/sports/ringer/${year}`).then((response) => {
			setTeamStandings(response.data);
		});
	}, [year]);

	// const handleYearChange = (event: SelectChangeEvent) => {
	// 	setYear(parseInt(event.target.value));
	// };

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	function a11yProps(index: number) {
		return {
			'id': `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`
		};
	}

	return (
		<Box id="ringer">
			{/* <FormControl color="secondary">
				<InputLabel>Year</InputLabel>
				<Select value={year.toString()} label="Year" onChange={handleYearChange}>
					<MenuItem value={2023}>2023</MenuItem>
					<MenuItem value={2022}>2022</MenuItem>
				</Select>
				<FormHelperText>2023 is the current year</FormHelperText>
			</FormControl> */}
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="Ringer Tabs">
					<Tab label="Skins Game" {...a11yProps(0)} />
					{/* <Tab label="Multi Year" {...a11yProps(1)} /> */}
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<SkinsGame teamStandings={teamStandings} year={year} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<MultiYearTab />
			</TabPanel>
		</Box>
	);
};

export default Ringer;
