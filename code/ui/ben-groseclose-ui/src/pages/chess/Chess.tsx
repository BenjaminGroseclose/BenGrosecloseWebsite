import { Box, IconButton, Typography } from '@mui/material';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import React, { useEffect, useState } from 'react';
import { columns, initBoardState, Piece, PieceType, Position, rows, TeamType } from './Constants';
import Tile, { TileProps } from './Tile';

const darkTileColor = '#BD9A7A';
const lightTileColor = '#654321';

const ChessPage = () => {
  const [tiles, setTiles] = useState<any[]>([]);
  const [movingPiece, setMovingPiece] = useState<Piece>();
  const [activePieces, setActivePieces] = useState<Piece[]>(initBoardState);
  
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

        let piece = initBoardState.find((p) => isSamePosition(p.position, currentPosition));

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

  }, []);

  const onTileClick = (piece?: Piece) => {
    if (movingPiece !== undefined) {
      let acceptableMoves = viableMoves(movingPiece)

      return;
    }

    setMovingPiece(piece);

    if (piece === undefined)
    {
      return;
    }

    let possibleMoves = viableMoves(piece);
    console.log(possibleMoves);
  }

  const viableMoves = (piece: Piece): Position[] => {
    let positions: Position[] = [];

    switch (piece.type) {
      case PieceType.PAWN:
        positions = possiblePawnMovement(piece);
        break;
      case PieceType.ROOK:
        break;
      case PieceType.KNIGHT:
        break;
      case PieceType.BISHOP:
        break;
      case PieceType.QUEEN:
        break;
      case PieceType.KING:
        break;
    }

    return positions;
  }

  const isSamePosition = (position1: Position, position2: Position): boolean => {
    return (position1.column === position2.column && position1.row === position2.row);
  }

  const findTile = (column: string, row: number): any => {
    return tiles.filter(x => x.props.column === column && x.props.row === row)[0].props;
  }

  const possiblePawnMovement = (piece: Piece): Position[] => {
    let positions: Position[] = [];

    if (piece.hasMoved === false) {
      positions.push({
        column: piece.position.column,
        row: piece.team === TeamType.WHITE ? piece.position.row + 2 : piece.position.row - 2
      });
    }

    positions.push({
      column: piece.position.column,
      row: piece.team === TeamType.WHITE ? piece.position.row + 1 : piece.position.row - 1
    });

    // Check if enemy is on attacking squares
    if ( findTile(piece.position.column, piece.position.row)) {

    }

    return positions;
  }

  const flipBoard = () => {
    let tempTiles = [];

    for (let i = tiles.length - 1; i >= 0; i--) {
      tempTiles.push(tiles[i]);
    }

    setTiles(tempTiles);
  }

  return (
    <Box id="chesspage">
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Chess
      </Typography>

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
    </Box>
  );

}

export default ChessPage;
