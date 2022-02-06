import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import React, { useEffect, useState } from 'react';
import { columns, initBoardState, Piece, PieceType, Position, rows, TeamType } from './Constants';
import Tile, { TileProps } from './Tile';

const darkTileColor = '#BD9A7A';
const lightTileColor = '#654321';

const ChessPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tiles, setTiles] = useState<JSX.Element[]>([]);
  const [movingPiece, setMovingPiece] = useState<Piece>();
  const [activePieces, setActivePieces] = useState<Piece[]>(initBoardState);
  
  useEffect(() => {
    let tempTileList = [];
    console.log(isLoading);

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

    console.log('setting tiles useEffect')
    console.log(tempTileList);
    setTiles(tempTileList);
    setIsLoading(false);

  }, []);

  const onTileClick = (backgroundColor: string, piece?: Piece) => {
    if (piece === undefined) {
      return;
    }

    if (movingPiece !== undefined) {
      // let acceptableMoves = viableMoves(movingPiece)
      console.log('moving...')
      
      let tempTiles = tiles;

      tempTiles[findTileIndex(piece.position.column, piece.position.row)] = <Tile
        key={`${piece.position.column},${piece.position.row}`} 
        backgroundColor={backgroundColor} 
        piece={movingPiece} 
        column={piece.position.column} 
        row={piece.position.row}
        onClick={onTileClick}
      />;

      tempTiles[findTileIndex(movingPiece.position.column, movingPiece.position.row)] = <Tile
        key={`${movingPiece.position.column},${movingPiece.position.row}`} 
        backgroundColor={backgroundColor} 
        piece={undefined} 
        column={movingPiece.position.column} 
        row={movingPiece.position.row}
        onClick={onTileClick}
      />;

      setTiles(tempTiles);

      return;
    }

    console.log('setting moving piece')
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
        positions = possibleRookMovement(piece);
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

  const findTile = (column: string, row: number): TileProps => {
    if (tiles !== undefined && tiles.length >= 1) {
      console.log(`${column}, ${row}`)
      console.log(tiles);
      return tiles.filter(x => x.props.column === column && x.props.row === row)[0].props as TileProps
    } else {
      console.log('it was undefined...')
      return tiles[0].props;
    }
  }

  const findTileIndex = (column: string, row: number): number => {
    return tiles.findIndex(x => x.props.column === column && x.props.row === row);
  }

  const possiblePawnMovement = (piece: Piece): Position[] => {
    let positions: Position[] = [];

    const normalMoveRow = piece.team === TeamType.WHITE ? piece.position.row + 1 : piece.position.row - 1;
    const doubleMoveRow = piece.team === TeamType.WHITE ? piece.position.row + 2 : piece.position.row - 2;

    console.log(`${piece.position.column}, ${normalMoveRow}`)

    if (findTile(piece.position.column, normalMoveRow).piece === undefined) {
      positions.push({
        column: piece.position.column,
        row: normalMoveRow
      });

      if (piece.hasMoved === false && findTile(piece.position.column, doubleMoveRow).piece === undefined) {
        positions.push({
          column: piece.position.column,
          row: doubleMoveRow
        });
      }
    }

    // Check if enemy is on attacking squares
    const originalColumn = columns.indexOf(piece.position.column)
    if (columns[originalColumn - 1]) {
      let tile1 = findTile(columns[originalColumn - 1], normalMoveRow);

      if (originalColumn !== 0 && tile1.piece !== undefined && tile1.piece.team !== piece.team) {
        positions.push({
          column: columns[originalColumn - 1],
          row: normalMoveRow
        });
      }
    }

    if (columns[originalColumn + 1]) {
      let tile2 = findTile(columns[originalColumn + 1], normalMoveRow);

      if (originalColumn !== 8 && tile2.piece !== undefined && tile2.piece.team !== piece.team) {
        positions.push({
          column: columns[originalColumn + 1],
          row: normalMoveRow
        });
      }
    }

    return positions;
  }

  const possibleRookMovement = (piece: Piece): Position[] => {
    let positions: Position[] = [];

    const originalRow = piece.position.row;
    const originalColumn = piece.position.column;

    // Move whole column unless blocked
    for (let i = columns.indexOf(originalColumn) - 1; i >= 0; i--) {
      let tile = findTile(columns[i], originalRow);
      if (tile.piece === undefined) {
        positions.push({
          column: columns[i],
          row: originalRow
        });
        continue;
      }

      if (tile.piece.team !== piece.team) {
        // Attack move
        positions.push({
          column: columns[i],
          row: originalRow
        });
        break;
      }

      break;
    }

    for (let i = columns.indexOf(originalColumn); i <= 8; i++) {
      let tile = findTile(columns[i], originalRow);
      if (tile.piece === undefined) {
        positions.push({
          column: columns[i],
          row: originalRow
        });
        continue;
      }

      if (tile.piece.team !== piece.team) {
        // Attack move
        positions.push({
          column: columns[i],
          row: originalRow
        });
        break;
      }

      break;
    }

    // Move whole row unless blocked
    for (let i = rows.indexOf(originalRow) - 1; i >= 0; i--) {
      let tile = findTile(originalColumn, rows[i]);
      if (tile.piece === undefined) {
        positions.push({
          column: originalColumn,
          row: rows[i]
        });
        continue;
      }

      if (tile.piece.team !== piece.team) {
        // Attack move
        positions.push({
          column: originalColumn,
          row: rows[i]
        });
        break;
      }

      break;
    }

    for (let i = rows.indexOf(originalRow); i <= 8; i++) {
      let tile = findTile(originalColumn, rows[i]);
      if (tile.piece === undefined) {
        positions.push({
          column: originalColumn,
          row: rows[i]
        });
        continue;
      }

      if (tile.piece.team !== piece.team) {
        // Attack move
        positions.push({
          column: originalColumn,
          row: rows[i]
        });
        break;
      }

      break;
    }

    return positions;
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
