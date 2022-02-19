import { columns, Piece, Position, rows } from '../Constants';
import { isTileFree, isTileTakenByOpponent } from './CommonRules';

export const possibleBishopMovement = (currentPiece: Piece, activePieces: Piece[], includeGuardMoves: boolean, ignoreKing: boolean): Position[] => {
	let positions: Position[] = [];

	const currentRowIndex = rows.indexOf(currentPiece.position.row);
	const currentColumnIndex = columns.indexOf(currentPiece.position.column);

	let i = 1;

	while (
		isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex + i] }, currentPiece.team, ignoreKing) ||
		isTileFree(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex + i] }, currentPiece.team, includeGuardMoves)
	) {
		positions.push({ column: columns[currentColumnIndex + i], row: rows[currentRowIndex + i] });

		if (isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex + i] }, currentPiece.team, ignoreKing)) {
			break;
		}

		i++;
	}

	i = 1;

	while (
		isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex - i] }, currentPiece.team, ignoreKing) ||
		isTileFree(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex - i] }, currentPiece.team, includeGuardMoves)
	) {
		positions.push({ column: columns[currentColumnIndex + i], row: rows[currentRowIndex - i] });

		if (isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex + i], row: rows[currentRowIndex - i] }, currentPiece.team, ignoreKing)) {
			break;
		}

		i++;
	}

	i = 1;

	while (
		isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex + i] }, currentPiece.team, ignoreKing) ||
		isTileFree(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex + i] }, currentPiece.team, includeGuardMoves)
	) {
		positions.push({ column: columns[currentColumnIndex - i], row: rows[currentRowIndex + i] });

		if (isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex + i] }, currentPiece.team, ignoreKing)) {
			break;
		}

		i++;
	}

	i = 1;

	while (
		isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex - i] }, currentPiece.team, ignoreKing) ||
		isTileFree(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex - i] }, currentPiece.team, includeGuardMoves)
	) {
		positions.push({ column: columns[currentColumnIndex - i], row: rows[currentRowIndex - i] });

		if (isTileTakenByOpponent(activePieces, { column: columns[currentColumnIndex - i], row: rows[currentRowIndex - i] }, currentPiece.team, ignoreKing)) {
			break;
		}

		i++;
	}

	return positions;
};
