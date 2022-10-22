import { Box } from '@mui/material';
import pattern from 'patternomaly';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ITeamStanding } from './models';

interface SkinsGameProps {
	teamStandings: ITeamStanding[];
	year: number;
}

const SkinsGame = ({ teamStandings, year }: SkinsGameProps) => {
	const TeamColors = new Map<string, CanvasPattern>([
		['Knicks', pattern.draw('diagonal-right-left', '#006bb6', '#f58426')],
		['Nets', pattern.draw('diagonal-right-left', '#000000', '#FFFFFF')],
		['Celtics', pattern.draw('diagonal-right-left', '#008348', '#000000')],
		['Raptors', pattern.draw('diagonal-right-left', '#ce1141', '#000000')],
		['76ers', pattern.draw('diagonal-right-left', '#006bb6', '#ed174c')],
		['Bulls', pattern.draw('diagonal-right-left', '#ce1141', '#000000')],
		['Cavaliers', pattern.draw('diagonal-right-left', '#6f263d', '#ffb81c')],
		['Pacers', pattern.draw('diagonal-right-left', '#002d62', '#fdbb30')],
		['Pistons', pattern.draw('diagonal-right-left', '	#1d428a', '#c8102e')],
		['Wizards', pattern.draw('diagonal-right-left', '#002b5c', '#e31837')],
		['Hornets', pattern.draw('diagonal-right-left', '#00788c', '#1d1160')],
		['Hawks', pattern.draw('diagonal-right-left', '#e03a3e', '#c1d32f')],
		['Heat', pattern.draw('diagonal-right-left', '#98002e', '#000000')],
		['Magic', pattern.draw('diagonal-right-left', '#0077c0', '#000000')],
		['Timberwolves', pattern.draw('diagonal-right-left', '#0c2340', '#78be20')],
		['Jazz', pattern.draw('diagonal-right-left', '#002b5c', '#f9a01b')],
		['Thunder', pattern.draw('diagonal-right-left', '#007ac1', '#ef3b24')],
		['Trail Blazers', pattern.draw('diagonal-right-left', '#e03a3e', '#000000')],
		['Nuggets', pattern.draw('diagonal-right-left', '#0e2240', '#fec524')],
		['Warriors', pattern.draw('diagonal-right-left', '#006bb6', '#fdb927')],
		['Clippers', pattern.draw('diagonal-right-left', '#c8102e', '#1d428a')],
		['Suns', pattern.draw('diagonal-right-left', '#1d1160', '#e56020')],
		['Kings', pattern.draw('diagonal-right-left', '#5a2b81', '#000000')],
		['Lakers', pattern.draw('diagonal-right-left', '#fdb927', '#552583')],
		['Grizzlies', pattern.draw('diagonal-right-left', '#5d76a9', '#12173f')],
		['Rockets', pattern.draw('diagonal-right-left', '#ce1141', '#c4ced4')],
		['Pelicans', pattern.draw('diagonal-right-left', '#002b5c', '#b4975a')],
		['Spurs', pattern.draw('diagonal-right-left', '#c4ced4', '#000000')],
		['Mavericks', pattern.draw('diagonal-right-left', '#0053bc', '#00285e')],
		['Bucks', pattern.draw('diagonal-right-left', '#00471b', '#eee1c6')]
	]);

	const Datasets = (): any[] => {
		let dataset: any[] = [];

		teamStandings.forEach((teamStanding) => {
			dataset.push({
				label: `${teamStanding.name} - Wins`,
				backgroundColor: TeamColors.get(teamStanding.name),
				data: DefineData(teamStanding.name, 'wins', teamStanding.wins),
				borderColor: '#000',
				borderWidth: 2
			});
			dataset.push({
				label: `${teamStanding.name} - Losses`,
				backgroundColor: TeamColors.get(teamStanding.name),
				data: DefineData(teamStanding.name, 'losses', teamStanding.losses),
				borderColor: '#000',
				borderWidth: 2
			});
		});

		return dataset;
	};

	const DefineData = (team: string, type: 'wins' | 'losses', count: number): number[] => {
		switch (team) {
			case 'Knicks':
				return type === 'wins' ? [count, 0, 0] : [0, 0, 0];
			case 'Nets':
				return type === 'wins' ? [0, count, 0] : [0, 0, 0];
			case 'Celtics':
				return type === 'wins' ? [0, 0, count] : [0, 0, 0];
			case 'Raptors':
				return type === 'wins' ? [0, count, 0] : [0, 0, 0];
			case '76ers':
				return type === 'wins' ? [0, 0, count] : [0, 0, 0];
			case 'Bulls':
				return type === 'wins' ? [0, 0, 0] : [0, 0, count];
			case 'Cavaliers':
				return type === 'wins' ? [count, 0, 0] : [0, 0, 0];
			case 'Pacers':
				return type === 'wins' ? [0, 0, 0] : [0, count, 0];
			case 'Pistons':
				return type === 'wins' ? [0, 0, 0] : [count, 0, 0];
			case 'Wizards':
				return type === 'wins' ? [0, 0, 0] : [0, count, 0];
			case 'Hornets':
				return type === 'wins' ? [0, 0, 0] : [0, 0, count];
			case 'Hawks':
				return type === 'wins' ? [0, 0, count] : [0, 0, 0];
			case 'Heat':
				return type === 'wins' ? [count, 0, 0] : [0, 0, 0];
			case 'Magic':
				return type === 'wins' ? [0, 0, 0] : [count, 0, 0];
			case 'Timberwolves':
				return type === 'wins' ? [count, 0, 0] : [0, 0, 0];
			case 'Jazz':
				return type === 'wins' ? [0, 0, 0] : [0, 0, count];
			case 'Thunder':
				return type === 'wins' ? [0, 0, 0] : [0, count, 0];
			case 'Trail Blazers':
				return type === 'wins' ? [0, 0, 0] : [count, 0, 0];
			case 'Nuggets':
				return type === 'wins' ? [count, 0, 0] : [0, 0, 0];
			case 'Warriors':
				return type === 'wins' ? [0, count, 0] : [0, 0, 0];
			case 'Clippers':
				return type === 'wins' ? [0, 0, count] : [0, 0, 0];
			case 'Suns':
				return type === 'wins' ? [0, count, 0] : [0, 0, 0];
			case 'Kings':
				return type === 'wins' ? [0, count, 0] : [0, 0, 0];
			case 'Lakers':
				return type === 'wins' ? [0, 0, count] : [0, 0, 0];
			case 'Grizzlies':
				return type === 'wins' ? [0, count, 0] : [0, 0, 0];
			case 'Rockets':
				return type === 'wins' ? [0, 0, 0] : [0, count, 0];
			case 'Pelicans':
				return type === 'wins' ? [0, 0, count] : [0, 0, 0];
			case 'Spurs':
				return type === 'wins' ? [0, 0, 0] : [count, 0, 0];
			case 'Mavericks':
				return type === 'wins' ? [0, 0, count] : [0, 0, 0];
			case 'Bucks':
				return type === 'wins' ? [count, 0, 0] : [0, 0, 0];
		}

		return [];
	};

	return (
		<Box>
			<Bar
				options={{
					plugins: {
						legend: {
							display: false
						},
						title: {
							display: true,
							text: `${year} Skins Game`
						}
					},
					scales: {
						x: {
							stacked: true
						},
						y: {
							stacked: true
						}
					}
				}}
				data={{
					labels: ['Bill', 'Ryen', 'House'],
					datasets: Datasets()
				}}
			/>
		</Box>
	);
};

export default SkinsGame;
