import { columns, Piece, PieceType, Position, rows, TeamType } from '../Constants';
import Referee from '../Referee';
import { isTileFree, isTileTakenByOpponent, onSameTile } from './CommonRules';

export const BLACK_KING_STARTING_SQUARE: Position = { column: 5, row: 8 };
export const BLACK_ROOK_LEFT_STARTING_SQUARE: Position = { column: 1, row: 8 };
export const BLACK_ROOK_RIGHT_STARTING_SQUARE: Position = { column: 8, row: 8 };

export const WHITE_KING_STARTING_SQUARE: Position = { column: 5, row: 1 };
export const WHITE_ROOK_LEFT_STARTING_SQUARE: Position = { column: 1, row: 1 };
export const WHITE_ROOK_RIGHT_STARTING_SQUARE: Position = { column: 8, row: 1 };

export const possibleKingMovement = (king: Piece, activePieces: Piece[]): Position[] => {
	const referee = new Referee();
	let positions: Position[] = [];

	const currentRowIndex = rows.indexOf(king.position.row);
	const currentColumnIndex = columns.indexOf(king.position.column);

	let positionToCheck = { column: columns[currentColumnIndex + 1], row: rows[currentRowIndex] };

	if (isTileTakenByOpponent(activePieces, positionToCheck, king.team) || isTileFree(activePieces, positionToCheck, king.team, false)) {
		positions.push(positionToCheck);
	}

	positionToCheck = { column: columns[currentColumnIndex + 1], row: rows[currentRowIndex + 1] };

	if (isTileTakenByOpponent(activePieces, positionToCheck, king.team) || isTileFree(activePieces, positionToCheck, king.team, false)) {
		positions.push(positionToCheck);
	}

	positionToCheck = { column: columns[currentColumnIndex], row: rows[currentRowIndex + 1] };

	if (isTileTakenByOpponent(activePieces, positionToCheck, king.team) || isTileFree(activePieces, positionToCheck, king.team, false)) {
		positions.push(positionToCheck);
	}

	positionToCheck = { column: columns[currentColumnIndex - 1], row: rows[currentRowIndex + 1] };

	if (isTileTakenByOpponent(activePieces, positionToCheck, king.team) || isTileFree(activePieces, positionToCheck, king.team, false)) {
		positions.push(positionToCheck);
	}

	positionToCheck = { column: columns[currentColumnIndex - 1], row: rows[currentRowIndex] };

	if (isTileTakenByOpponent(activePieces, positionToCheck, king.team) || isTileFree(activePieces, positionToCheck, king.team, false)) {
		positions.push(positionToCheck);
	}

	positionToCheck = { column: columns[currentColumnIndex - 1], row: rows[currentRowIndex - 1] };

	if (isTileTakenByOpponent(activePieces, positionToCheck, king.team) || isTileFree(activePieces, positionToCheck, king.team, false)) {
		positions.push(positionToCheck);
	}

	positionToCheck = { column: columns[currentColumnIndex], row: rows[currentRowIndex - 1] };

	if (isTileTakenByOpponent(activePieces, positionToCheck, king.team) || isTileFree(activePieces, positionToCheck, king.team, false)) {
		positions.push(positionToCheck);
	}

	positionToCheck = { column: columns[currentColumnIndex + 1], row: rows[currentRowIndex - 1] };

	if (isTileTakenByOpponent(activePieces, positionToCheck, king.team) || isTileFree(activePieces, positionToCheck, king.team, false)) {
		positions.push(positionToCheck);
	}

	// Castle Rules
	// Next step confirm that the path to the rook is clear
	if (king.team === TeamType.BLACK) {
		// Can not castle unless on starting square
		if (onSameTile(king.position, BLACK_KING_STARTING_SQUARE)) {
			const blackRooks = activePieces.filter((x) => x.pieceType === PieceType.ROOK && x.team === TeamType.BLACK);

			if (
				blackRooks.filter((x) => onSameTile(x.position, BLACK_ROOK_RIGHT_STARTING_SQUARE)).length > 0 &&
				activePieces.filter((x) => x.position.column === 7 && x.position.row === 8).length === 0 &&
				activePieces.filter((x) => x.position.column === 6 && x.position.row === 8).length === 0
			) {
				// King side castle
				positions.push({ column: 7, row: 8 });
			}

			if (
				blackRooks.filter((x) => onSameTile(x.position, BLACK_ROOK_LEFT_STARTING_SQUARE)).length > 0 &&
				activePieces.filter((x) => x.position.column === 4 && x.position.row === 8).length === 0 &&
				activePieces.filter((x) => x.position.column === 3 && x.position.row === 8).length === 0 &&
				activePieces.filter((x) => x.position.column === 2 && x.position.row === 8).length === 0
			) {
				// Queen side castle
				positions.push({ column: 3, row: 8 });
			}
		}
	} else {
		// Can not castle unless on starting square
		if (onSameTile(king.position, WHITE_KING_STARTING_SQUARE)) {
			const whiteRooks = activePieces.filter((x) => x.pieceType === PieceType.ROOK && x.team === TeamType.WHITE);

			if (
				whiteRooks.filter((x) => onSameTile(x.position, WHITE_ROOK_RIGHT_STARTING_SQUARE)).length > 0 &&
				activePieces.filter((x) => x.position.column === 7 && x.position.row === 1).length === 0 &&
				activePieces.filter((x) => x.position.column === 6 && x.position.row === 1).length === 0
			) {
				// King side castle
				positions.push({ column: 7, row: 1 });
			}

			if (
				whiteRooks.filter((x) => onSameTile(x.position, WHITE_ROOK_LEFT_STARTING_SQUARE)).length > 0 &&
				activePieces.filter((x) => x.position.column === 4 && x.position.row === 1).length === 0 &&
				activePieces.filter((x) => x.position.column === 3 && x.position.row === 1).length === 0 &&
				activePieces.filter((x) => x.position.column === 2 && x.position.row === 1).length === 0
			) {
				// Queen side castle
				positions.push({ column: 3, row: 1 });
			}
		}
	}

	const opponentPieces = activePieces.filter((x) => x.team !== king.team);

	opponentPieces.forEach((piece) => {
		let opponentPieceMoves = referee.moveablePositions(activePieces, piece, true, true, false);

		if (positions !== undefined && positions.length > 0) {
			opponentPieceMoves.forEach((pieceMoves) => {
				const matchingPosition = positions.find((x) => x.column === pieceMoves.column && x.row === pieceMoves.row);
				if (matchingPosition) {
					const matchingPositionIndex = positions.indexOf(matchingPosition);
					positions.splice(matchingPositionIndex, 1);
				}
			});
		}
	});

	// Remove other king possible movement
	const opponentKing = opponentPieces.find((x) => x.team !== king.team && x.pieceType === PieceType.KING);

	if (opponentKing) {
		const opponentKingMovement = baseKingMovement(opponentKing);

		opponentKingMovement.forEach((pieceMoves) => {
			const matchingPosition = positions.find((x) => x.column === pieceMoves.column && x.row === pieceMoves.row);
			if (matchingPosition) {
				const matchingPositionIndex = positions.indexOf(matchingPosition);
				positions.splice(matchingPositionIndex, 1);
			}
		});
	}

	return positions;
};

export const baseKingMovement = (king: Piece): Position[] => {
	let positions: Position[] = [];

	const currentRowIndex = rows.indexOf(king.position.row);
	const currentColumnIndex = columns.indexOf(king.position.column);

	positions.push({ column: columns[currentColumnIndex - 1], row: rows[currentRowIndex - 1] });
	positions.push({ column: columns[currentColumnIndex], row: rows[currentRowIndex - 1] });
	positions.push({ column: columns[currentColumnIndex + 1], row: rows[currentRowIndex - 1] });

	positions.push({ column: columns[currentColumnIndex - 1], row: rows[currentRowIndex] });
	positions.push({ column: columns[currentColumnIndex + 1], row: rows[currentRowIndex] });

	positions.push({ column: columns[currentColumnIndex - 1], row: rows[currentRowIndex + 1] });
	positions.push({ column: columns[currentColumnIndex], row: rows[currentRowIndex + 1] });
	positions.push({ column: columns[currentColumnIndex + 1], row: rows[currentRowIndex + 1] });

	return positions;
};
