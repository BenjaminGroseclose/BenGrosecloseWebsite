import { Box } from '@mui/material';
import React from 'react';
import { Piece } from './Constants';

export interface TileProps {
  piece?: Piece,
  backgroundColor: string,
  column: string,
  row: number,
  onClick: (backgroundColor: string, piece?: Piece) => void
}

const Tile = ({piece, backgroundColor, column, row, onClick}: TileProps) => {
  return (
    <Box
      id={`${column}${row}`}
      sx={{ backgroundColor: backgroundColor }}
      onClick={() => onClick(backgroundColor, piece)}
    >
      {
        piece ? <img id={`${column}${row}-image`} src={piece.image} alt={`${column}${row} tile`} width={50} height={50} /> 
        : <span></span>
      }
    </Box>
  );
}

export default Tile;