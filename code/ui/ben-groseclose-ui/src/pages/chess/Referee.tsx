import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { GameState, Piece, PieceType, Position, TeamType, columns, rows } from './Constants';
import { possibleBishopMovement } from './rules/Bishop';
import { onSameTile } from './rules/CommonRules';
import { possibleKingMovement } from './rules/King';
import { possibleKnightMovement } from './rules/Knight';
import { possiblePawnMovement } from './rules/Pawn';
import { possibleQueenMovement } from './rules/Queen';
import { possibleRookMovement } from './rules/Rook';

export default class Referee {
	moveableKingPositions = (activePieces: Piece[], piece: Piece): Position[] => {
		return possibleKingMovement(piece, activePieces);
	};

	moveablePositions = (
		activePieces: Piece[],
		piece: Piece,
		inculdeAllAttack: boolean = false,
		ignoreKing: boolean = false,
		checkingGameState: boolean = false
	): Position[] => {
		let positions: Position[] = [];

		switch (piece.pieceType) {
			case PieceType.PAWN:
				positions = possiblePawnMovement(piece, activePieces, inculdeAllAttack);
				break;
			case PieceType.ROOK:
				positions = possibleRookMovement(piece, activePieces, ignoreKing);
				break;
			case PieceType.KNIGHT:
				positions = possibleKnightMovement(piece, activePieces);
				break;
			case PieceType.BISHOP:
				positions = possibleBishopMovement(piece, activePieces, ignoreKing, ignoreKing);
				break;
			case PieceType.QUEEN:
				positions = possibleQueenMovement(piece, activePieces, ignoreKing);
				break;
		}

		// Can not move to put themselves into check logic
		if (checkingGameState) {
			positions.forEach((newPosition: Position, index: number) => {
				let tempPieces = [...activePieces.filter((x) => x.id !== piece.id)];

				// check if move is attacking
				if (tempPieces.filter((x) => onSameTile(x.position, newPosition) && x.team !== piece.team).length > 0) {
					const attackedPieceIndex = tempPieces.findIndex((x) => onSameTile(x.position, newPosition));
					delete tempPieces[attackedPieceIndex];
				}

				let tempPiece: Piece = {
					id: piece.id,
					image: piece.image,
					position: newPosition,
					pieceType: piece.pieceType,
					team: piece.team
				};

				tempPieces.push(tempPiece);
				let possibleUpcomingGameState = this.detectGameState(tempPieces, piece.team);

				if (possibleUpcomingGameState.checkingPieces.length > 0 && possibleUpcomingGameState.checkingPieces[0].team !== piece.team) {
					delete positions[index];
				}
			});
		}

		return positions;
	};

	filterToRemoveCheckedStatus = (movingPositions: Position[], activePieces: Piece[], checkingPieces: Piece[]): Position[] => {
		let updatedPositions: Position[] = movingPositions;
		const checkingTeam = checkingPieces[0].team;

		const checkedKing = activePieces.find((x) => x && x.pieceType === PieceType.KING && x.team !== checkingTeam);

		if (checkedKing === undefined) {
			throw new Error('Unabled to determine the checked king...');
		}

		checkingPieces.forEach((piece) => {
			let canAttackCheckingPiece = updatedPositions.filter((x) => onSameTile(x, piece.position)).length > 0;

			if (piece.pieceType === PieceType.ROOK) {
				let attackingRookPositions = possibleRookMovement(piece, activePieces, false);

				updatedPositions.forEach((x: Position, index: number) => {
					if (attackingRookPositions.filter((y) => onSameTile(x, y)).length === 0) {
						delete updatedPositions[index];
					}
				});
			} else if (piece.pieceType === PieceType.BISHOP) {
				updatedPositions = this.handleCheckedBishopAttack(piece, updatedPositions, checkedKing);
			} else if (piece.pieceType === PieceType.QUEEN) {
				// Determine if column or row attack
				if (piece.position.column === checkedKing.position.column) {
					// column attack
					updatedPositions = updatedPositions.filter(
						(x) =>
							x.column === piece.position.column &&
							((x.row < piece.position.row && x.row > checkedKing.position.row) || (x.row > piece.position.row && x.row < checkedKing.position.row))
					);
				} else if (piece.position.row === checkedKing.position.row) {
					// row attack
					updatedPositions = updatedPositions.filter(
						(x) =>
							x.row === piece.position.row &&
							((x.column < piece.position.column && x.column > checkedKing.position.column) ||
								(x.column > piece.position.column && x.row < checkedKing.position.column))
					);
				} else {
					updatedPositions = this.handleCheckedBishopAttack(piece, updatedPositions, checkedKing);
				}
			}

			if (canAttackCheckingPiece) {
				updatedPositions.push(piece.position);
			}
		});

		return updatedPositions;
	};

	// TODO: Determine if there is checkmate
	detectGameState = (activePieces: Piece[], lastTurnTeam: TeamType): RefereeGameState => {
		let gameState = GameState.NORMAL;
		let checkingPieces: Piece[] = [];

		switch (lastTurnTeam) {
			case TeamType.WHITE:
				checkingPieces = this.evaluateBoard(activePieces, TeamType.WHITE);
				break;
			case TeamType.BLACK:
				checkingPieces = this.evaluateBoard(activePieces, TeamType.BLACK);
				break;
			case TeamType.NEUTRAL:
				// Check white
				checkingPieces = this.evaluateBoard(activePieces, TeamType.WHITE);

				if (checkingPieces.length === 0) {
					// Check black
					checkingPieces = this.evaluateBoard(activePieces, TeamType.BLACK);
				}
				break;
			default:
				throw new Error(`Unexpected team type provided ${lastTurnTeam}`);
		}

		if (checkingPieces.length > 0) {
			const checkingTeam = checkingPieces[0].team;
			const checkedKing = activePieces.find((x) => x && x.pieceType === PieceType.KING && x.team !== checkingTeam);

			if (checkedKing === undefined) {
				throw new Error('Unable to determine checked king');
			}

			if (checkingTeam === TeamType.WHITE) {
				gameState = GameState.BLACK_CHECKED;
			} else {
				gameState = GameState.WHITE_CHECKED;
			}

			const kingMoves = possibleKingMovement(checkedKing, activePieces);

			// King can't move checking for block / captures
			if (kingMoves && kingMoves.length === 0) {
				console.log('King has no moves');
				const checkedKingPieces = [...activePieces.filter((x) => x.team === checkedKing.team)];
				let canBlock = false;

				checkedKingPieces.forEach((piece: Piece, index: number) => {
					let movingPiecePositions = this.moveablePositions(activePieces, piece, false, false, false);

					movingPiecePositions = this.filterToRemoveCheckedStatus(movingPiecePositions, activePieces, checkingPieces);

					if (movingPiecePositions.length > 0) {
						console.log(movingPiecePositions);
						console.log(piece);
						canBlock = true;
					}
				});

				console.log(canBlock);
				if (canBlock === false) {
					console.log('no one can block for the king');
					// Checkmate
					if (checkingTeam === TeamType.WHITE) {
						gameState = GameState.BLACK_CHECK_MATE;
					} else {
						gameState = GameState.WHITE_CHECK_MATE;
					}
				}
			}
		}

		return {
			gameState: gameState,
			checkingPieces: checkingPieces
		};
	};

	private handleCheckedBishopAttack(piece: Piece, updatedPositions: Position[], checkedKing: Piece): Position[] {
		let blockablePositions: Position[] = [];
		const kingColumnIndex = columns.indexOf(checkedKing.position.column);
		const kingRowIndex = rows.indexOf(checkedKing.position.row);
		const pieceColumnIndex = columns.indexOf(piece.position.column);

		const rowDiff = checkedKing.position.row - piece.position.row;
		const columnDiff = kingColumnIndex - pieceColumnIndex;

		let i = 1;
		if (rowDiff > 0) {
			if (columnDiff > 0) {
				// piece to the left and above
				while (piece.position.column !== columns[kingColumnIndex - i] && piece.position.row !== rows[kingRowIndex - i]) {
					blockablePositions.push({ column: columns[kingColumnIndex - i], row: rows[kingRowIndex - i] });
					i++;
				}
			} else {
				// piece to the left and below
				while (piece.position.column !== columns[kingColumnIndex + i] && piece.position.row !== rows[kingRowIndex - i]) {
					blockablePositions.push({ column: columns[kingColumnIndex + i], row: rows[kingRowIndex - i] });
					i++;
				}
			}
		} else {
			if (columnDiff > 0) {
				// piece to the right and above
				while (piece.position.column !== columns[kingColumnIndex - i] && piece.position.row !== rows[kingRowIndex + i]) {
					blockablePositions.push({ column: columns[kingColumnIndex - i], row: rows[kingRowIndex + i] });
					i++;
				}
			} else {
				// piece to the right and below
				while (piece.position.column !== columns[kingColumnIndex + i] && piece.position.row !== rows[kingRowIndex + i]) {
					blockablePositions.push({ column: columns[kingColumnIndex + i], row: rows[kingRowIndex] + i });
					i++;
				}
			}
		}

		let newMovablePositions: Position[] = [];
		updatedPositions.forEach((position) => {
			if (blockablePositions.filter((x) => x.column === position.column && x.row === position.row).length > 0) {
				newMovablePositions.push(position);
			}
		});

		return newMovablePositions;
	}

	private evaluateBoard(activePieces: Piece[], team: TeamType): Piece[] {
		const opponentKingPosition = activePieces.filter((x) => x.team === team && x.pieceType === PieceType.KING)[0].position;

		const lastTurnTeamPieces = activePieces.filter((x) => x.team !== team);
		let isOpponentChecked = false;
		let checkingPieces: Piece[] = [];

		lastTurnTeamPieces.forEach((piece) => {
			let positions = this.moveablePositions(activePieces, piece, true, false, false);

			isOpponentChecked = positions.filter((x) => x.column === opponentKingPosition.column && x.row === opponentKingPosition.row).length > 0;

			if (isOpponentChecked) {
				checkingPieces.push(piece);
			}
		});

		return checkingPieces;
	}
}

export interface RefereeGameState {
	gameState: GameState;
	checkingPieces: Piece[];
}
