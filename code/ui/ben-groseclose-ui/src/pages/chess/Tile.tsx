import { Box } from '@mui/material';
import React from 'react';
import { Piece } from './Constants';

export interface TileProps {
  piece?: Piece,
  backgroundColor: string,
  column: string,
  row: number
}

const Tile = ({piece, backgroundColor, column, row}: TileProps) => {
  return (
    <Box
      id={`${column}${row}`}
      sx={{ backgroundColor: backgroundColor }}
    >
      {
        piece ? <img id={`${column}${row}-image`} src={piece.image} alt={`${column}${row} tile`} width={50} height={50} /> 
        : <span></span>
      }
    </Box>
  );
}

export default Tile;