import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Tile, { TileProps } from './Tile';

const darkTileColor = '#BD9A7A';
const lightTileColor = '#654321';

const ChessPage = () => {
  const [tiles, setTiles] = useState<TileProps[]>([]);
  
  useEffect(() => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    rows.map((row, n): void => {
      columns.map((column, m): void => {
        let backgroundColor = '';

        if (row % 2 === 0) {
          backgroundColor = m % 2 === 1 ? darkTileColor : lightTileColor
        } else {
          backgroundColor = m % 2 === 1 ? lightTileColor : darkTileColor
        }

        let tempTileList = tiles;
        tempTileList.push({
          backgroundColor: backgroundColor,
          column: column,
          row: row
        });

        setTiles(tempTileList);
      });
    });

  });

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

      <ChessBoard />
    </Box>
  );

}

export default ChessPage;
