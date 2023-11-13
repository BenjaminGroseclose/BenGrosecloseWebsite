import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ITeamStanding } from './models';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

interface IMultiYearStandings {
	standings: ITeamStanding[];
	teamIDs: number[];
}

const MultiYearTab = () => {
	let [winsOrLosses] = useState<'wins' | 'losses'>(); // TODO
	let [teamStandings, setTeamStandings] = useState<ITeamStanding[]>();
	let [teamIDs, setTeamIDs] = useState<number[]>([]);

	useEffect(() => {
		axios.get<IMultiYearStandings>('/api/sports/ringer//multi-year').then((response) => {
			setTeamStandings(response.data.standings);
			setTeamIDs(response.data.teamIDs);
		});
	}, []);

	const teamsData = (): any => {
		let data: any[] = [];
		if (teamStandings && teamStandings !== null) {
			if (winsOrLosses === 'wins') {
				teamIDs.forEach((teamID) => {
					const standings = teamStandings!!.filter((x) => x.teamID === teamID);

					data.push({
						id: teamID,
						label: standings[0].name,
						data: standings.map((x) => x.wins)
					});
				});
			} else {
			}
		}

		return data;
	};

	return (
		<>
			<Line
				datasetIdKey="id"
				data={{
					labels: [teamStandings?.keys()],
					datasets: teamsData()
				}}
			/>
		</>
	);
};

export default MultiYearTab;
