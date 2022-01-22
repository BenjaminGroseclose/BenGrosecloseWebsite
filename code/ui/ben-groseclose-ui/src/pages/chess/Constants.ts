export interface Position {
  column: string,
  row: number
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING
}

export enum TeamType {
  WHITE,
  BLACK
}

export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
}