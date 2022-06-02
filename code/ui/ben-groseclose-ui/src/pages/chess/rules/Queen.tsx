import { columns, Piece, Position, rows } from '../Constants';
import { isTileFree, isTileTakenByOpponent } from './CommonRules';

export const possibleQueenMovement = (currentPiece: Piece, activePieces: Piece[], includeGuardMoves: boolean): Position[] => {
	let positions: Position[] = [];

	const currentRowIndex = rows.indexOf(currentPiece.position.row);
	const currentColumnIndex = columns.indexOf(currentPiece.position.column);

	for (let i = currentRowIndex + 1; i < rows.length; i++) {
		let positionToCheck = { column: currentPiece.position.column, row: rows[i] };
		if (isTileTakenByOpponent(activePieces, positionToCheck, currentPiece.team)) {
			positions.push(positionToCheck);
			break;
		} else if (isTileFree(activePieces, positionToCheck, currentPiece.team, includeGuardMoves)) {
			positions.push(positionToCheck);
		} else {
			break;
		}
	}

	for (let i = currentRowIndex - 1; i >= 0; i--) {
		let positionToCheck = { column: currentPiece.position.column, row: rows[i] };
		if (isTileTakenByOpponent(activePieces, positionToCheck, currentPiece.team)) {
			positions.push(positionToCheck);
			break;
		} else if (isTileFree(activePieces, positionToCheck, currentPiece.team, includeGuardMoves)) {
			positions.push(positionToCheck);
		} else {
			break;
		}
	}

	for (let i = currentColumnIndex + 1; i < columns.length; i++) {
		let positionToCheck = { column: columns[i], row: currentPiece.position.row };
		if (isTileTakenByOpponent(activePieces, positionToCheck, currentPiece.team)) {
			positions.push(positionToCheck);
			break;
		} else if (isTileFree(activePieces, positionToCheck, currentPiece.team, includeGuardMoves)) {
			positions.push(positionToCheck);
		} else {
			break;
		}
	}

	for (let i = currentColumnIndex - 1; i >= 0; i--) {
		let positionToCheck = { column: columns[i], row: currentPiece.position.row };
		if (isTileTakenByOpponent(activePieces, positionToCheck, currentPiece.team)) {
			positions.push(positionToCheck);
			break;
		} else if (isTileFree(activePieces, positionToCheck, currentPiece.team, includeGuardMoves)) {
			positions.push(positionToCheck);
		} else {
			break;
		}
	}

	let i = 1;

	while (
		isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex + i] }, currentPiece.team) ||
		isTileFree(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex + i] }, currentPiece.team, includeGuardMoves)
	) {
		positions.push({ column: columns[currentColumnIndex + i], row: rows[currentRowIndex + i] });

		if (isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex + i] }, currentPiece.team)) {
			break;
		}

		i++;
	}

	i = 1;

	while (
		isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex - i] }, currentPiece.team) ||
		isTileFree(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex - i] }, currentPiece.team, includeGuardMoves)
	) {
		positions.push({ column: columns[currentColumnIndex + i], row: rows[currentRowIndex - i] });

		if (isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex - i] }, currentPiece.team)) {
			break;
		}

		i++;
	}

	i = 1;

	while (
		isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex + i] }, currentPiece.team) ||
		isTileFree(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex + i] }, currentPiece.team, includeGuardMoves)
	) {
		positions.push({ column: columns[currentColumnIndex - i], row: rows[currentRowIndex + i] });

		if (isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex + i] }, currentPiece.team)) {
			break;
		}

		i++;
	}

	i = 1;

	while (
		isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex - i] }, currentPiece.team) ||
		isTileFree(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex - i] }, currentPiece.team, includeGuardMoves)
	) {
		positions.push({ column: columns[currentColumnIndex - i], row: rows[currentRowIndex - i] });

		if (isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex - i] }, currentPiece.team)) {
			break;
		}

		i++;
	}

	return positions;
};
