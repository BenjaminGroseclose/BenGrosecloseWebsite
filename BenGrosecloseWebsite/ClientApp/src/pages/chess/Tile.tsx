import { Box } from '@mui/material';
import React from 'react';
import { columnMap, Piece, Position } from './Constants';

const attackTileColor = '#FF3632';

export interface TileProps {
	piece?: Piece;
	showMoveIcon: boolean;
	backgroundColor: string;
	column: number;
	row: number;
	onClick: (position: Position, piece?: Piece) => void;
}

const Tile = ({ piece, showMoveIcon, backgroundColor, column, row, onClick }: TileProps) => {
	if (piece && showMoveIcon) {
		backgroundColor = attackTileColor;
	}

	return (
		<Box id={`${columnMap[column]}${row}`} sx={{ backgroundColor: backgroundColor }} onClick={() => onClick({ column: column, row: row }, piece)}>
			{piece ? (
				<img id={`${columnMap[column]}${row}-piece`} src={piece.image} alt={`${columnMap[column]}${row} tile`} width={50} height={50} />
			) : showMoveIcon ? (
				<Box
					sx={{
						backgroundColor: 'rgba(0,0,0,.2)',
						borderRadius: '50%',
						boxSizing: 'border-box',
						pointerEvents: 'none',
						height: '25px',
						width: '25px',
						margin: '12.5px auto 12.5px'
					}}
				></Box>
			) : (
				<span></span>
			)}
		</Box>
	);
};

export default Tile;
