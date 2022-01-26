import { Box, Icon, IconButton, Typography } from '@mui/material';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import React, { useEffect, useState } from 'react';
import { columns, initBoardState, Piece, Position, rows } from './Constants';
import Tile from './Tile';

const darkTileColor = '#BD9A7A';
const lightTileColor = '#654321';

const ChessPage = () => {
  const [tiles, setTiles] = useState<any[]>([]);
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

        tempTileList.push(<Tile key={`${columns[j]},${rows[i]}`} backgroundColor={backgroundColor} piece={piece} column={columns[j]} row={rows[i]} />);
      }
    }

    setTiles(tempTileList);

  }, []);

  const isSamePosition = (position1: Position, position2: Position): boolean => {
    return (position1.column === position2.column && position1.row === position2.row);
  }

  const flipBoard = () => {
    setTiles(tiles.reverse());
  }

  return (
    <Box id="chesspage">
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Chess
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 50px)',
            gridTemplatseRows: 'repeat(8, 50px)'
          }}
        >
          {tiles}
        </Box>
        <Box>
          <IconButton onClick={flipBoard}>
            <WifiProtectedSetupIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

}

export default ChessPage;
