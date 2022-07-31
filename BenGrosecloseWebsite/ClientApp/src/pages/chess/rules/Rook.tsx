import { columns, Piece, Position, rows } from '../Constants';
import { isTileFree, isTileTakenByOpponent } from './CommonRules';

export const possibleRookMovement = (currentPiece: Piece, activePieces: Piece[], ignoreKing: boolean): Position[] => {
	let positions: Position[] = [];

	const currentRowIndex = rows.indexOf(currentPiece.position.row);
	const currentColumnIndex = columns.indexOf(currentPiece.position.column);

	for (let i = currentRowIndex + 1; i < rows.length; i++) {
		let positionToCheck = { column: currentPiece.position.column, row: rows[i] };

		if (isTileTakenByOpponent(activePieces, positionToCheck, currentPiece.team, ignoreKing)) {
			positions.push(positionToCheck);
			break;
		} else if (isTileFree(activePieces, positionToCheck, currentPiece.team, ignoreKing, ignoreKing)) {
			positions.push(positionToCheck);
		} else {
			break;
		}
	}

	for (let i = currentRowIndex - 1; i >= 0; i--) {
		let positionToCheck = { column: currentPiece.position.column, row: rows[i] };
		if (isTileTakenByOpponent(activePieces, positionToCheck, currentPiece.team, ignoreKing)) {
			positions.push(positionToCheck);
			break;
		} else if (isTileFree(activePieces, positionToCheck, currentPiece.team, ignoreKing, ignoreKing)) {
			positions.push(positionToCheck);
		} else {
			break;
		}
	}

	for (let i = currentColumnIndex + 1; i < columns.length; i++) {
		let positionToCheck = { column: columns[i], row: currentPiece.position.row };
		if (isTileTakenByOpponent(activePieces, positionToCheck, currentPiece.team, ignoreKing)) {
			positions.push(positionToCheck);
			break;
		} else if (isTileFree(activePieces, positionToCheck, currentPiece.team, ignoreKing, ignoreKing)) {
			positions.push(positionToCheck);
		} else {
			break;
		}
	}

	for (let i = currentColumnIndex - 1; i >= 0; i--) {
		let positionToCheck = { column: columns[i], row: currentPiece.position.row };
		if (isTileTakenByOpponent(activePieces, positionToCheck, currentPiece.team, ignoreKing)) {
			positions.push(positionToCheck);
			break;
		} else if (isTileFree(activePieces, positionToCheck, currentPiece.team, ignoreKing, ignoreKing)) {
			positions.push(positionToCheck);
		} else {
			break;
		}
	}

	return positions;
};
