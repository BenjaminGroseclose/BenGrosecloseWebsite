import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import React, { useEffect, useState } from 'react';
import { columns, initBoardState, Piece, Position, rows } from './Constants';
import Tile from './Tile';
import Referee from './Referee';

const darkTileColor = '#BD9A7A';
const lightTileColor = '#654321';

const ChessPage = () => {
  let [isLoading, setIsLoading] = useState<boolean>(true);
  const [tiles, setTiles] = useState<JSX.Element[]>([]);
  let [movingPiece, setMovingPiece] = useState<Piece>();
  let [activePieces, setActivePieces] = useState<Piece[]>(initBoardState);
  let [reloadToggle, setReloadToggle] = useState<boolean>(false);
  let [possiblePositions, setPossiblePositions] = useState<Position[]>([]);
  const referee = new Referee();
  
  useEffect(() => {
    let tempTileList = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        let backgroundColor = '';

        if (rows[i] % 2 === 0) {
          backgroundColor = j % 2 === 1 ? darkTileColor : lightTileColor
        } else {
          backgroundColor = j % 2 === 1 ? lightTileColor : darkTileColor
        }

        let currentPosition: Position = { column: columns[j], row: rows[i] }

        let piece = activePieces.find((p) => isSamePosition(p.position, currentPosition));

        tempTileList.push(<Tile
          key={`${columns[j]},${rows[i]}`} 
          backgroundColor={backgroundColor} 
          piece={piece} 
          column={columns[j]} 
          row={rows[i]}
          onClick={onTileClick}
        />);
      }
    }

    setTiles(tempTileList);
    setIsLoading(false);

  }, [reloadToggle]);

  const onTileClick = (position: Position, piece?: Piece) => {
    if (movingPiece === undefined && piece) {
      // User has click on a tile with a piece and moving peice is not set
      setMovingPiece(piece);
      setPossiblePositions(referee.moveablePositions(activePieces, piece));
    } else if (movingPiece && isInPositionList(position)) {
      // Moving a piece to provided position
      let tempPiece = movingPiece;
      tempPiece.position = position;

      let tempPieces = activePieces.filter(x => x.id !== movingPiece?.id);
      tempPieces.push(tempPiece);

      setActivePieces(tempPieces);

      // No longer moving clear movingPiece
      setMovingPiece(undefined);
    } else {
      setMovingPiece(undefined);
    }

    setReloadToggle(!reloadToggle);
  }

  const isInPositionList = (position: Position): boolean => {
    const filtedPositions = possiblePositions.filter(x => x.column === position.column &&
                                                     x.row === position.row);

    return (filtedPositions && filtedPositions.length > 0);
  }

  const isSamePosition = (position1: Position, position2: Position): boolean => {
    return (position1.column === position2.column && position1.row === position2.row);
  }

  const flipBoard = () => {
    let tempTiles = [];

    for (let i = tiles.length - 1; i >= 0; i--) {
      tempTiles.push(tiles[i]);
    }

    console.log('setting tiles flip')
    setTiles(tempTiles);
  }

  return (
    <Box id="chesspage">
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Chess
      </Typography>

      {
        isLoading === true ? <CircularProgress /> :
      
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
            <IconButton onClick={flipBoard} color='secondary'>
              Flip Board<WifiProtectedSetupIcon />
            </IconButton>
          </Box>
        </Box>
      }
    </Box>
  );

}

export default ChessPage;
