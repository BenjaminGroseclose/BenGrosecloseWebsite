import { Piece, PieceType, Position } from "./Constants";
import { possiblePawnMovement } from "./rules/Pawn";

export default class Referee {

  moveablePositions = (activePieces: Piece[], piece: Piece): Position[] => {
    let positions: Position[] = [];

    switch (piece.type) {
      case PieceType.PAWN:
        console.log('pawn moving...');
        positions = possiblePawnMovement(piece, activePieces);
        break;
      case PieceType.ROOK:
        //positions = possibleRookMovement(piece);
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
}