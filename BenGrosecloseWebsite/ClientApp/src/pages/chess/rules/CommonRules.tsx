import { columns, Piece, PieceType, Position, TeamType } from '../Constants';

export const isTileTakenByOwnTeam = (acitvePieces: Piece[], movingPosition: Position, movingTeam: TeamType): boolean => {
	const piecesOnMovingTile = acitvePieces.filter((x) => x.position.column === movingPosition.column && x.position.row === movingPosition.row);

	if (piecesOnMovingTile === undefined || piecesOnMovingTile.length === 0) {
		// nothing on the tile
		return false;
	}

	if (piecesOnMovingTile[0].team === movingTeam) {
		return true;
	}

	return false;
};

export const isOnBoard = (movingPosition: Position): boolean => {
	if (movingPosition.row === undefined || movingPosition.row > 8 || movingPosition.row < 0) {
		// Not on board
		return false;
	}

	let tempColumns = columns.filter((x) => x === movingPosition.column);
	if (tempColumns === undefined || tempColumns.length === 0) {
		// Not on board
		return false;
	}

	return true;
};

export const isTileFreeOrOpponent = (acitvePieces: Piece[], movingPosition: Position, movingTeam: TeamType): boolean => {
	let onBoard = isOnBoard(movingPosition);
	let freeOrOpponent = !isTileTakenByOwnTeam(acitvePieces, movingPosition, movingTeam);

	return onBoard && freeOrOpponent;
};

export const isTileFree = (
	acitvePieces: Piece[],
	movingPosition: Position,
	movingTeam: TeamType,
	includeGuardMoves: boolean,
	ignoreKing: boolean = false
): boolean => {
	return (
		isOnBoard(movingPosition) &&
		(!isTileTakenByOwnTeam(acitvePieces, movingPosition, movingTeam) || includeGuardMoves) &&
		!isTileTakenByOpponent(acitvePieces, movingPosition, movingTeam, ignoreKing)
	);
};

export const isTileTakenByOpponent = (acitvePieces: Piece[], movingPosition: Position, movingTeam: TeamType, ignoreKing: boolean = false): boolean => {
	const piecesOnMovingTile = acitvePieces.filter((x) => onSameTile(x.position, movingPosition));

	if (piecesOnMovingTile === undefined || piecesOnMovingTile.length === 0) {
		// nothing on the tile
		return false;
	}

	if (piecesOnMovingTile[0].team !== movingTeam) {
		if (piecesOnMovingTile[0].pieceType === PieceType.KING && ignoreKing) {
			return false;
		} else {
			return true;
		}
	}

	return false;
};

export const onSameTile = (position1: Position, position2: Position): boolean => {
	return position1.column === position2.column && position1.row === position2.row;
};

export const isTileTakenByOpponentKing = (acitvePieces: Piece[], movingPosition: Position, movingTeam: TeamType): boolean => {
	const piecesOnMovingTile = acitvePieces.filter((x) => x.position.column === movingPosition.column && x.position.row === movingPosition.row);

	if (piecesOnMovingTile === undefined || piecesOnMovingTile.length === 0) {
		// nothing on the tile
		return false;
	}

	if (piecesOnMovingTile[0].team !== movingTeam && piecesOnMovingTile[0].pieceType === PieceType.KING) {
		return true;
	}

	return false;
};
