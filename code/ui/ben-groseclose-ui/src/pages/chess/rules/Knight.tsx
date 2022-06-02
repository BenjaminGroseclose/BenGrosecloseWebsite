import { columns, Piece, Position, rows } from '../Constants';
import { isTileFree, isTileFreeOrOpponent, isTileTakenByOpponent } from './CommonRules';

export const possibleKnightMovement = (currentPiece: Piece, activePieces: Piece[]): Position[] => {
	let positions: Position[] = [];

	const currentRowIndex = rows.indexOf(currentPiece.position.row);
	const currentColumnIndex = columns.indexOf(currentPiece.position.column);

	// need to check all 8 positions

	let movablePositions: Position[] = [
		{ column: columns[currentColumnIndex + 1], row: rows[currentRowIndex + 2] },
		{ column: columns[currentColumnIndex + 2], row: rows[currentRowIndex + 1] },
		{ column: columns[currentColumnIndex + 2], row: rows[currentRowIndex - 1] },
		{ column: columns[currentColumnIndex + 1], row: rows[currentRowIndex - 2] },
		{ column: columns[currentColumnIndex - 1], row: rows[currentRowIndex + 2] },
		{ column: columns[currentColumnIndex - 2], row: rows[currentRowIndex + 1] },
		{ column: columns[currentColumnIndex - 2], row: rows[currentRowIndex - 1] },
		{ column: columns[currentColumnIndex - 1], row: rows[currentRowIndex - 2] }
	];

	for (let i = 0; i < movablePositions.length; i++) {
		let positionToCheck = movablePositions[i];

		if (isTileFreeOrOpponent(activePieces, positionToCheck, currentPiece.team)) {
			positions.push(positionToCheck);
		}
	}

	return positions;
};
