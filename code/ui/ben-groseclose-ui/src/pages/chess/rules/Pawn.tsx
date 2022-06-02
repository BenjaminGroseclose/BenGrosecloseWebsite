import { columns, Piece, Position, TeamType } from '../Constants';
import { isOnBoard, isTileFree, isTileTakenByOpponent } from './CommonRules';

export const possiblePawnMovement = (currentPiece: Piece, activePieces: Piece[], includeAttack: boolean = false): Position[] => {
	let positions: Position[] = [];

	const normalMoveRow = currentPiece.team === TeamType.WHITE ? currentPiece.position.row + 1 : currentPiece.position.row - 1;
	const doubleMoveRow = currentPiece.team === TeamType.WHITE ? currentPiece.position.row + 2 : currentPiece.position.row - 2;

	if (isTileFree(activePieces, { column: currentPiece.position.column, row: normalMoveRow }, currentPiece.team, true)) {
		// Add first move
		positions.push({
			column: currentPiece.position.column,
			row: normalMoveRow
		});

		let hasMoved: boolean = false;
		if (currentPiece.team === TeamType.WHITE) {
			hasMoved = currentPiece.position.row !== 2;
		} else {
			hasMoved = currentPiece.position.row !== 7;
		}

		if (hasMoved === false && isTileFree(activePieces, { column: currentPiece.position.column, row: doubleMoveRow }, currentPiece.team, true)) {
			positions.push({
				column: currentPiece.position.column,
				row: doubleMoveRow
			});
		}
	}

	// Check attack moves
	const columnIndex = columns.indexOf(currentPiece.position.column);
	const attackPositionOne: Position = { column: columns[columnIndex - 1], row: normalMoveRow };
	const attackPositionTwo: Position = { column: columns[columnIndex + 1], row: normalMoveRow };
	if (includeAttack || (isOnBoard(attackPositionOne) && isTileTakenByOpponent(activePieces, attackPositionOne, currentPiece.team))) {
		positions.push(attackPositionOne);
	}

	if (includeAttack || (isOnBoard(attackPositionTwo) && isTileTakenByOpponent(activePieces, attackPositionTwo, currentPiece.team))) {
		positions.push(attackPositionTwo);
	}

	return positions;
};
