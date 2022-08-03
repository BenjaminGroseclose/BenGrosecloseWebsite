import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import React, { useCallback, useEffect, useState } from 'react';
import { columnMap, columns, GameState, initBoardState, Piece, PieceType, Position, reverseColumnMap, rows, TeamType } from './Constants';
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
import useWindowDimensions from './WindowDimensions';
import { useParams } from 'react-router-dom';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

/*
	BUGS
	Look into how to switch pieces easly when on same team

	FEATURES
	Required (In priority)
	- Promotion
	- Offer draws
	- Surrender

	Nice to have:
	- Calc material advantage
	- Display a snack bar when warnings happen
	- Detect draws
*/
const darkTileColor = '#BD9A7A';
const lightTileColor = '#654321';
const selectedTileColor = '#90EE90';

const OnlineChessPage = () => {
	const { gameId } = useParams();
	let [turn, setTurn] = useState<number>(1);
	let [team, setTeam] = useState<TeamType>(TeamType.WHITE);
	let [gameStatus, setGameStatus] = useState<GameState>(GameState.NOT_STARTED);
	let [checkingPieces, setCheckingPieces] = useState<Piece[]>([]);
	const [connection, setConnection] = useState<HubConnection>();
	let [isLoading, setIsLoading] = useState<boolean>(true);
	let [tiles, setTiles] = useState<JSX.Element[]>([]);
	let [selectedPiece, setSelectedPiece] = useState<Piece>();
	let [activePieces, setActivePieces] = useState<Piece[]>(initBoardState);
	let [isBoardFlipped, setIsBoardFlipped] = useState<boolean>(true);
	let [moveablePositions, setMoveablePositions] = useState<Position[]>([]);
	let [blackGraveyard, setBlackGraveyard] = useState<Piece[]>([]);
	let [whiteGraveyard, setWhiteGraveyard] = useState<Piece[]>([]);
	let [openDialog, setOpenDialog] = useState<boolean>(false);
	let [chessNotation, setChessNotation] = useState<string[]>([]);
	const [selectedPieceId, setSelectedPieceId] = useState<number>(0);
	const [movingPosition, setMovingPosition] = useState<Position>();

	const { width } = useWindowDimensions();
	const referee = new Referee();

	useEffect(() => {
		if (connection) {
			connection.send('LeaveGame', gameId);
			connection.stop();
		} else {
			const newConnection = new HubConnectionBuilder().withUrl('/hubs/chess').withAutomaticReconnect().build();

			setConnection(newConnection);
		}
	}, []);

	useEffect(() => {
		if (connection && connection.state === HubConnectionState.Disconnected) {
			connection
				.start()
				.then(() => {
					console.log('Connected!');

					connection.send('CreateGame', gameId);

					connection.on('Notification', (message: string) => {
						console.log(message);
					});

					connection.on('StartGame', () => {
						console.log('Updating game state! state');
						setGameStatus(GameState.NORMAL);
					});

					connection.on('RestartGame', () => {
						setActivePieces(initBoardState);
						console.log('Updating game state! restart');
						setTurn(1);
						setTeam(TeamType.WHITE);
						setGameStatus(GameState.NOT_STARTED);
						setCheckingPieces([]);
					});

					connection.on('ChessMove', (selectedPieceId: number, newChessNotation: string) => {
						const tempPosition: string = newChessNotation.slice(-2);
						const position: Position = { column: reverseColumnMap[tempPosition[0]], row: +tempPosition[1] };

						setSelectedPieceId(selectedPieceId);
						setMovingPosition(position);
						let tempChessNotation = chessNotation;
						tempChessNotation.push(newChessNotation);
						setChessNotation(tempChessNotation);
					});
				})
				.catch((e) => console.log('Connection failed: ', e));
		}
	}, [connection, gameId, chessNotation]);

	useEffect(() => {
		const position = movingPosition;
		if (position === undefined || selectedPieceId === 0) {
			return;
		}

		const isSelectedPositionCastleMove = (selectedPosition: Position): boolean => {
			return (
				onSameTile(selectedPosition, { column: 3, row: 1 }) ||
				onSameTile(selectedPosition, { column: 7, row: 1 }) ||
				onSameTile(selectedPosition, { column: 3, row: 8 }) ||
				onSameTile(selectedPosition, { column: 7, row: 8 })
			);
		};

		const tempSelectedPiece = activePieces.find((x) => x.id === selectedPieceId);

		if (tempSelectedPiece === undefined) {
			throw new Error(`Unabled to find an active piece with id ${selectedPieceId}`);
		}

		let tempPieces = activePieces.filter((x) => x.id !== tempSelectedPiece?.id && x.team !== TeamType.NEUTRAL);

		if (tempSelectedPiece.pieceType === PieceType.KING && isSelectedPositionCastleMove(position)) {
			// Check if castle move
			if (tempSelectedPiece.team === TeamType.WHITE && onSameTile(tempSelectedPiece.position, WHITE_KING_STARTING_SQUARE)) {
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
			} else if (onSameTile(tempSelectedPiece.position, BLACK_KING_STARTING_SQUARE)) {
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
		let tempPiece = tempSelectedPiece;

		tempPiece.position = position;

		let enemyPieceIndex = tempPieces.findIndex((p) => p.position.column === position.column && p.position.row === position.row);

		if (enemyPieceIndex !== -1) {
			if (tempSelectedPiece.team === TeamType.WHITE) {
				setBlackGraveyard([...blackGraveyard, tempPieces[enemyPieceIndex]]);
			} else {
				setWhiteGraveyard([...whiteGraveyard, tempPieces[enemyPieceIndex]]);
			}

			delete tempPieces[enemyPieceIndex];
			tempPieces = tempPieces.filter((x) => x);
		}

		tempPieces.push(tempPiece);
		setActivePieces(tempPieces);

		const refereeGameState = referee.detectGameState(tempPieces, TeamType.NEUTRAL);

		setTurn(turn + 1);
		setTeam(team === TeamType.WHITE ? TeamType.BLACK : TeamType.WHITE);
		setGameStatus(refereeGameState.gameState);
		setCheckingPieces(refereeGameState.checkingPieces);

		// TODO:
		//setChessNotation([...chessNotation, newChessNotation]);

		if (
			refereeGameState.gameState === GameState.BLACK_CHECK_MATE ||
			refereeGameState.gameState === GameState.WHITE_CHECK_MATE ||
			refereeGameState.gameState === GameState.DRAW
		) {
			setOpenDialog(true);
		}

		// Reset for next move
		setSelectedPieceId(0);
		setMovingPosition(undefined);
	}, [selectedPieceId, movingPosition]);

	const onTileClick = useCallback(
		(position: Position, piece?: Piece) => {
			const getMoveablePositions = (piece: Piece): Position[] => {
				const refereeGameState = referee.detectGameState(activePieces, TeamType.NEUTRAL);
				let movablePositions: Position[] = [];

				if (piece.pieceType === PieceType.KING) {
					movablePositions = referee.moveableKingPositions(activePieces, piece, gameStatus);
				} else {
					movablePositions = referee.moveablePositions(activePieces, piece, false, false, true);
				}

				if (refereeGameState.checkingPieces.length !== 0 && refereeGameState.checkingPieces[0].team !== piece.team && piece.pieceType !== PieceType.KING) {
					movablePositions = referee.filterToRemoveCheckedStatus(movablePositions, activePieces, checkingPieces);
				}

				return movablePositions;
			};

			const isInPositionList = (position: Position): boolean => {
				const filtedPositions = moveablePositions.filter((x) => x.column === position.column && x.row === position.row);

				return filtedPositions && filtedPositions.length > 0;
			};

			if (gameStatus === GameState.BLACK_CHECK_MATE || gameStatus === GameState.WHITE_CHECK_MATE) {
				setOpenDialog(true);
				return;
			}

			if (gameStatus === GameState.NOT_STARTED) {
				return;
			}

			if (team !== piece?.team && team !== selectedPiece?.team) {
				return;
			}

			if (selectedPiece === undefined && piece) {
				// User has click on a tile with a piece and moving peice is not set
				setSelectedPiece(piece);

				setMoveablePositions(getMoveablePositions(piece));
				return;
			} else if (selectedPiece && isInPositionList(position)) {
				// TODO: Send to chess hub
				let isCapture = false;
				let enemyPieceIndex = activePieces.findIndex((p) => onSameTile(p.position, position));

				if (enemyPieceIndex !== -1) {
					isCapture = true;
				}

				const createChessNotation = (selectedPosition: Position, selectedPiece: Piece, isCapture: boolean, originalPosition: Position): string => {
					let notation = '';

					if (selectedPiece.pieceType === PieceType.PAWN) {
						if (isCapture) {
							notation = `${columnMap[originalPosition.column]}x${columnMap[selectedPosition.column]}${selectedPosition.row}`;
						} else {
							notation = `${columnMap[selectedPosition.column]}${selectedPosition.row}`;
						}
					} else {
						switch (selectedPiece.pieceType) {
							case PieceType.KNIGHT:
								notation = 'N';
								break;
							case PieceType.BISHOP:
								notation = 'G';
								break;
							case PieceType.ROOK:
								notation = 'R';
								break;
							case PieceType.QUEEN:
								notation = 'Q';
								break;
							case PieceType.KING:
								notation = 'K';
								break;
						}

						if (isCapture) {
							notation = notation + 'x';
						}
						notation = notation + `${columnMap[selectedPosition.column]}${selectedPosition.row}`;
					}

					return notation;
				};

				const chessNotation = createChessNotation(position, selectedPiece, isCapture, selectedPiece.position);

				if (connection) {
					connection.send('ChessMove', selectedPiece.id, chessNotation, gameId);
				} else {
					throw new Error('Connection is broken');
				}
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
		[gameStatus, selectedPiece, connection, checkingPieces, team]
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
		if (connection) {
			connection.send('RestartGame', gameId);
		}
	};

	const start = () => {
		if (connection) {
			connection.send('StartGame', gameId);
		}
	};

	const DisplayGameInformation = () => {
		return (
			<Box id="game-information">
				<Typography>Team Turn: {team === TeamType.WHITE ? 'White' : 'Black'}</Typography>
				<Typography>Turn: {turn}</Typography>

				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '8px' }}>
						{chessNotation?.map((notation: string, index: number) => {
							return (
								<Typography key={index} sx={{ marginRight: '4px' }}>
									{notation}
								</Typography>
							);
						})}
					</Box>
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
		);
	};

	const EndDialog = () => {
		const handleClose = () => {
			setOpenDialog(false);
		};

		return (
			<Dialog onClose={handleClose} open={openDialog}>
				{gameStatus === GameState.DRAW ? (
					<DialogTitle>Draw!</DialogTitle>
				) : (
					<DialogTitle>{gameStatus === GameState.BLACK_CHECK_MATE ? 'White Wins!' : 'Black Wins!'}</DialogTitle>
				)}
				<DialogContent></DialogContent>
				<DialogActions>
					<Button color="primary" onClick={handleClose}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	return (
		<Box id="chesspage">
			<Box sx={{ display: 'flex', flexDirection: 'row' }}>
				<Typography variant="h4" sx={{ marginBottom: 3 }}>
					Chess
				</Typography>
				{gameStatus === GameState.NOT_STARTED ? (
					<Box sx={{ display: 'flex', flexDirection: 'row' }}>
						<Button sx={{ marginLeft: '8px', height: '40px' }} color="primary" variant="outlined" onClick={start}>
							Start
						</Button>
						<Button sx={{ marginLeft: '8px', height: '40px' }} color="secondary" variant="outlined" href="/chess">
							Offline
						</Button>
					</Box>
				) : (
					<span></span>
				)}
			</Box>

			{isLoading === true ? (
				<CircularProgress />
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: width > 750 ? 'row' : 'column',
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
						{gameStatus === GameState.NOT_STARTED ? (
							<span></span>
						) : (
							<Box>
								<Box sx={{ display: 'flex', flexDirection: width > 750 ? 'column' : 'row', marginTop: '8px' }}>
									<IconButton onClick={flipBoard} color="primary">
										Flip Board
										<WifiProtectedSetupIcon />
									</IconButton>
									<Button color="secondary" variant="outlined" onClick={restart}>
										Restart
									</Button>
								</Box>

								<DisplayGameInformation />
							</Box>
						)}
					</Box>
				</Box>
			)}
			<EndDialog />
		</Box>
	);
};

export default OnlineChessPage;
