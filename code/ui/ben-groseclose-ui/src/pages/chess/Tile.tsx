import { Box } from '@mui/material';
import React from 'react';

export interface TileProps {
  image?: string,
  backgroundColor: string,
  column: string,
  row: number
}

const Tile = ({image, backgroundColor, column, row}: TileProps) => {
  return (
    <Box
      id={`${column}${row}`}
      sx={{
        backgroundColor: backgroundColor,
        height: 40,
        width: 40
    }}
    >
      {
        image ? <img id={`${column}${row}-image`} src={image} alt={`${column}${row} tile`} /> 
        : <span></span>
      }
    </Box>
  );
}

export default Tile;