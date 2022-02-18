import { columns, Piece, Position, TeamType } from "../Constants"

export const isTileTakenByOwnTeam = (acitvePieces: Piece[], movingPosition: Position, movingTeam: TeamType): boolean => {
  const piecesOnMovingTile = acitvePieces.filter(x => x.position.column === movingPosition.column &&
                                                 x.position.row === movingPosition.row);

  console.log(piecesOnMovingTile);

  if (piecesOnMovingTile === undefined || piecesOnMovingTile.length === 0) {
    // nothing on the tile
    return false;
  }

  if (piecesOnMovingTile[0].team === movingTeam) {
    return true;
  }

  return false;
}

export const isOnBoard = (movingPosition: Position): boolean => {
  if (movingPosition.row > 8 || movingPosition.row < 0) {
    // Not on board
    return false;
  }

  let tempColumns = columns.filter(x => x === movingPosition.column)
  if (tempColumns === undefined || tempColumns.length === 0) {
    // Not on board
    return false;
  }

  return true;
}

export const isTileFree = (acitvePieces: Piece[], movingPosition: Position, movingTeam: TeamType): boolean => {
  return (isOnBoard(movingPosition) &&
          !isTileTakenByOwnTeam(acitvePieces, movingPosition, movingTeam) &&
          !isTileTakenByOpponent(acitvePieces, movingPosition, movingTeam))
}

export const isTileTakenByOpponent = (acitvePieces: Piece[], movingPosition: Position, movingTeam: TeamType): boolean => {
  const piecesOnMovingTile = acitvePieces.filter(x => x.position.column === movingPosition.column &&
                                                 x.position.row === movingPosition.row);

  if (piecesOnMovingTile === undefined || piecesOnMovingTile.length === 0) {
    // nothing on the tile
    return false;
  }

  console.log(piecesOnMovingTile);

  if (piecesOnMovingTile[0].team !== movingTeam) {
    return true;
  }

  return false;
}
