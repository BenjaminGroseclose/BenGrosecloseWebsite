import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import React, { useCallback, useEffect, useState } from 'react';
import { columns, GameState, initBoardState, Piece, PieceType, Position, rows, TeamType } from './Constants';
import Tile from './Tile';
import Referee from './Referee';
import { onSameTile } from './rules/CommonRules';
import {
	BLACK_KING_STARTING_SQUARE,
	BLACK_ROOK_LEFT_STARTING_SQUARE,
	BLACK_ROOK_RIGHT_STARTING_SQUARE,
	WHITE_KING_STARTING_SQUARE,
	WHITE_ROOK_LEFT_STARTING_SQUARE,
	WHITE_ROOK_RIGHT_STARTING_SQUARE
} from './rules/King';

/*
	BUGS

	FEATURES
	Required (In priority)
  - Checkmate can be detected
	- Promotion
	- Offer draws
	- Surrender

	Nice to have:
	- Calc material advantage
	- Chess annotation
	- Display a snack bar when warnings happen
	- Detect draws
*/
const darkTileColor = '#BD9A7A';
const lightTileColor = '#654321';
const selectedTileColor = '#90EE90';

interface ChessGameState {
	turn: number;
	team: TeamType;
	state: GameState;
	checkingPieces: Piece[];
}

const ChessPage = () => {
	let [gameState, setGameState] = useState<ChessGameState>({
		turn: 1,
		team: TeamType.WHITE,
		state: GameState.NOT_STARTED,
		checkingPieces: []
	});
	let [isLoading, setIsLoading] = useState<boolean>(true);
	let [tiles, setTiles] = useState<JSX.Element[]>([]);
	let [selectedPiece, setSelectedPiece] = useState<Piece>();
	let [activePieces, setActivePieces] = useState<Piece[]>(initBoardState);
	let [isBoardFlipped, setIsBoardFlipped] = useState<boolean>(true);
	let [moveablePositions, setMoveablePositions] = useState<Position[]>([]);
	let [blackGraveyard, setBlackGraveyard] = useState<Piece[]>([]);
	let [whiteGraveyard, setWhiteGraveyard] = useState<Piece[]>([]);
	const referee = new Referee();

	const onTileClick = useCallback(
		(position: Position, piece?: Piece) => {
			const isSelectedPositionCastleMove = (selectedPosition: Position): boolean => {
				return (
					onSameTile(selectedPosition, { column: 3, row: 1 }) ||
					onSameTile(selectedPosition, { column: 7, row: 1 }) ||
					onSameTile(selectedPosition, { column: 3, row: 8 }) ||
					onSameTile(selectedPosition, { column: 7, row: 8 })
				);
			};

			const getMoveablePositions = (piece: Piece): Position[] => {
				const refereeGameState = referee.detectGameState(activePieces, TeamType.NEUTRAL);
				let movablePositions: Position[] = [];

				if (piece.pieceType === PieceType.KING) {
					movablePositions = referee.moveableKingPositions(activePieces, piece);
				} else {
					movablePositions = referee.moveablePositions(activePieces, piece, false, false, true);
				}

				if (refereeGameState.checkingPieces.length !== 0 && refereeGameState.checkingPieces[0].team !== piece.team && piece.pieceType !== PieceType.KING) {
					movablePositions = referee.filterToRemoveCheckedStatus(movablePositions, activePieces, gameState.checkingPieces);
				}

				return movablePositions;
			};

			const isInPositionList = (position: Position): boolean => {
				const filtedPositions = moveablePositions.filter((x) => x.column === position.column && x.row === position.row);

				return filtedPositions && filtedPositions.length > 0;
			};

			if (gameState.state === GameState.NOT_STARTED) {
				return;
			}

			if (gameState.team !== piece?.team && gameState.team !== selectedPiece?.team) {
				return;
			}

			if (selectedPiece === undefined && piece) {
				// User has click on a tile with a piece and moving peice is not set
				setSelectedPiece(piece);

				setMoveablePositions(getMoveablePositions(piece));
				return;
			} else if (selectedPiece && isInPositionList(position)) {
				let tempPieces = activePieces.filter((x) => x.id !== selectedPiece?.id && x.team !== TeamType.NEUTRAL);

				if (selectedPiece.pieceType === PieceType.KING && isSelectedPositionCastleMove(position)) {
					// Check if castle move
					if (selectedPiece.team === TeamType.WHITE && onSameTile(selectedPiece.position, WHITE_KING_STARTING_SQUARE)) {
						if (onSameTile(position, { column: 7, row: 1 })) {
							let rook = tempPieces.find((x) => onSameTile(x.position, WHITE_ROOK_RIGHT_STARTING_SQUARE));
							if (rook) {
								rook.position = { column: 6, row: 1 };
							}
						} else if (onSameTile(position, { column: 3, row: 1 })) {
							let rook = tempPieces.find((x) => onSameTile(x.position, WHITE_ROOK_LEFT_STARTING_SQUARE));
							if (rook) {
								rook.position = { column: 4, row: 1 };
							}
						} else {
							throw new Error('Invalid castle tile for white king');
						}
					} else if (onSameTile(selectedPiece.position, BLACK_KING_STARTING_SQUARE)) {
						if (onSameTile(position, { column: 7, row: 8 })) {
							let rook = tempPieces.find((x) => onSameTile(x.position, BLACK_ROOK_RIGHT_STARTING_SQUARE));
							if (rook) {
								rook.position = { column: 6, row: 8 };
							}
						} else if (onSameTile(position, { column: 3, row: 8 })) {
							let rook = tempPieces.find((x) => onSameTile(x.position, BLACK_ROOK_LEFT_STARTING_SQUARE));
							if (rook) {
								rook.position = { column: 4, row: 8 };
							}
						} else {
							throw new Error('Invalid castle tile for black king');
						}
					}
				}

				// Moving a piece and ending turn
				let tempPiece = selectedPiece;
				tempPiece.position = position;

				let enemyPieceIndex = tempPieces.findIndex((p) => p.position.column === position.column && p.position.row === position.row);

				if (enemyPieceIndex) {
					if (selectedPiece.team === TeamType.WHITE) {
						setBlackGraveyard([...blackGraveyard, tempPieces[enemyPieceIndex]]);
					} else {
						setWhiteGraveyard([...whiteGraveyard, tempPieces[enemyPieceIndex]]);
					}

					delete tempPieces[enemyPieceIndex];
				}

				tempPieces.push(tempPiece);
				setActivePieces(tempPieces);

				const refereeGameState = referee.detectGameState(tempPieces, TeamType.NEUTRAL);

				setGameState({
					team: gameState.team === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE,
					turn: gameState.turn + 1,
					state: refereeGameState.gameState,
					checkingPieces: refereeGameState.checkingPieces
				});
			}
			// TODO: look into how to switch pieces easly when on same team
			//  else if (piece && piece?.team === selectedPiece?.team) {
			// 	setSelectedPiece(piece);
			// 	setMoveablePositions(getMoveablePositions(piece));
			// 	onTileClick(position, piece);
			// }

			setSelectedPiece(undefined);
			setMoveablePositions([]);
		},
		[gameState, selectedPiece]
	);

	useEffect(() => {
		function createTile(i: number, j: number): JSX.Element {
			let backgroundColor = '';
			let showMoveIcon = false;

			if (rows[i] % 2 === 0) {
				backgroundColor = j % 2 === 1 ? darkTileColor : lightTileColor;
			} else {
				backgroundColor = j % 2 === 1 ? lightTileColor : darkTileColor;
			}

			let currentPosition: Position = { column: columns[j], row: rows[i] };
			let tilePiece = activePieces.find((p) => p?.position.column === currentPosition.column && p?.position.row === currentPosition.row);

			// If selectedPiece is on the current tile then update background color
			if (selectedPiece && tilePiece?.id === selectedPiece?.id) {
				backgroundColor = selectedTileColor;
			}

			// If current position is in the movablePositions list
			if (moveablePositions.filter((x) => x.column === currentPosition.column && x.row === currentPosition.row).length > 0) {
				showMoveIcon = true;
			}

			return (
				<Tile
					key={`${columns[j]},${rows[i]}`}
					showMoveIcon={showMoveIcon}
					backgroundColor={backgroundColor}
					piece={tilePiece}
					column={columns[j]}
					row={rows[i]}
					onClick={onTileClick}
				/>
			);
		}

		let tempTileList: JSX.Element[] = [];

		if (isBoardFlipped) {
			for (let i = 7; i >= 0; i--) {
				for (let j = 7; j >= 0; j--) {
					tempTileList.push(createTile(i, j));
				}
			}
		} else {
			for (let i = 0; i < rows.length; i++) {
				for (let j = 0; j < columns.length; j++) {
					tempTileList.push(createTile(i, j));
				}
			}
		}

		setTiles(tempTileList);
		setIsLoading(false);
	}, [isBoardFlipped, activePieces, moveablePositions, onTileClick, selectedPiece]);

	const flipBoard = () => {
		let tempTiles = [];

		for (let i = tiles.length - 1; i >= 0; i--) {
			tempTiles.push(tiles[i]);
		}

		setTiles(tempTiles);
		setIsBoardFlipped(!isBoardFlipped);
	};

	const restart = () => {
		console.error('TODO: RESTART');
	};

	const start = () => {
		setGameState({
			...gameState,
			state: GameState.NORMAL
		});
	};

	return (
		<Box id="chesspage">
			<Typography variant="h4" sx={{ marginBottom: 3 }}>
				Chess
			</Typography>

			{isLoading === true ? (
				<CircularProgress />
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						marginBottom: 4
					}}
				>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(8, 50px)',
							gridTemplateRows: 'repeat(8, 50px)'
						}}
					>
						{tiles}
					</Box>
					<Box sx={{ marginLeft: 1 }}>
						{gameState.state === GameState.NOT_STARTED ? (
							<Button color="primary" variant="outlined" onClick={start}>
								Start
							</Button>
						) : (
							<Box sx={{ display: 'flex', flexDirection: 'column' }}>
								<Typography>Team: {gameState.team === TeamType.WHITE ? 'White' : 'Black'}</Typography>
								<Typography>Turn: {gameState.turn}</Typography>
								<Typography>State: {gameState.state}</Typography>
								<IconButton onClick={flipBoard} color="primary">
									Flip Board
									<WifiProtectedSetupIcon />
								</IconButton>
								<Button color="secondary" variant="outlined" onClick={restart}>
									Restart
								</Button>
								<Box sx={{ display: 'flex', flexDirection: 'column' }}>
									<Box sx={{ display: 'flex', flexDirection: 'row' }}>
										{blackGraveyard.map((piece: Piece, index: number) => {
											if (piece) {
												return <img key={index} id={`${index}`} src={piece.image} alt={`Black Pieces ${piece.image} graveyard`} width={50} height={50} />;
											} else {
												return <span key={index}></span>;
											}
										})}
									</Box>
									<Box sx={{ display: 'flex', flexDirection: 'row' }}>
										{whiteGraveyard.map((piece: Piece, index: number) => {
											if (piece) {
												return <img key={index} id={`${index}`} src={piece.image} alt={`White Pieces ${piece.image} graveyard`} width={50} height={50} />;
											} else {
												return <span key={index}></span>;
											}
										})}
									</Box>
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default ChessPage;
