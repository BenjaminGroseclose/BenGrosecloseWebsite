import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Piece } from './Constants';
import Tile from './Tile';

const darkTileColor = '#BD9A7A';
const lightTileColor = '#654321';

const ChessPage = () => {
  const [tiles, setTiles] = useState<any[]>([]);
  const [pieces, setPieces] = useState<Piece[]>();
  
  useEffect(() => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    let tempTileList = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        let backgroundColor = '';

        if (rows[i] % 2 === 0) {
          backgroundColor = j % 2 === 1 ? darkTileColor : lightTileColor
        } else {
          backgroundColor = j % 2 === 1 ? lightTileColor : darkTileColor
        }

        tempTileList.push(<Tile key={`${columns[j]},${rows[i]}`} backgroundColor={backgroundColor} image='' column={columns[j]} row={rows[i]} />);
      }
    }

    setTiles(tempTileList)
    console.log(tempTileList);

  }, []);

  const ChessBoard = () => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    return (
      <Paper id="board" elevation={4} sx={{
        width: 320,
        height: 320,
        marginBottom: 4
      }}>
        {
          rows.map((row, n) => {
            return ( 
              <Box key={n} sx={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
              {
                columns.map((column, m) => {
                  let backgroundColor = '';
                  let image = '';

                  if (row % 2 === 0) {
                    backgroundColor = m % 2 === 1 ? darkTileColor : lightTileColor
                  } else {
                    backgroundColor = m % 2 === 1 ? lightTileColor : darkTileColor
                  }

                  return (
                    <Tile
                      key={`${column}${row}`}
                      image=''
                      backgroundColor={backgroundColor}
                      column={column}
                      row={row}
                    />
                  );
                })
              }
              </Box>
            );
            })
          }
      </Paper>
    );
  };

  return (
    <Box id="chesspage">
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Chess
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 40px)',
          gridTemplateRows: 'repeat(8, 40px)'
        }}
      >

      
        {tiles}
      </Box>
    </Box>
  );

}

export default ChessPage;
