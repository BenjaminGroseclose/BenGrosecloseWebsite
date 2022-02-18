const WHITE_PAWN = "images/chess-pieces/white_pawn.png";
const BLACK_PAWN = "images/chess-pieces/black_pawn.png";

const WHITE_ROOK = "images/chess-pieces/white_rook.png";
const BLACK_ROOK = "images/chess-pieces/black_rook.png";

const WHITE_BISHOP = "images/chess-pieces/white_bishop.png";
const BLACK_BISHOP = "images/chess-pieces/black_bishop.png";

const WHITE_KNIGHT = "images/chess-pieces/white_knight.png";
const BLACK_KNIGHT = "images/chess-pieces/black_knight.png";

const WHITE_QUEEN = "images/chess-pieces/white_queen.png";
const BLACK_QUEEN = "images/chess-pieces/black_queen.png";

const WHITE_KING = "images/chess-pieces/white_king.png"
const BLACK_KING = "images/chess-pieces/black_king.png"

export const rows = [1, 2, 3, 4, 5, 6, 7, 8];
export const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

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
  id: number;
  image: string;
  position: Position;
  type: PieceType;
  team: TeamType;
  enPassant?: boolean;
}

export const initBoardState: Piece[] = [
  { id: 1, image: WHITE_PAWN, position: { column: 'A', row: 2 }, team: TeamType.WHITE, type: PieceType.PAWN },
  { id: 2, image: WHITE_PAWN, position: { column: 'B', row: 2 }, team: TeamType.WHITE, type: PieceType.PAWN },
  { id: 3, image: WHITE_PAWN, position: { column: 'C', row: 2 }, team: TeamType.WHITE, type: PieceType.PAWN },
  { id: 4, image: WHITE_PAWN, position: { column: 'D', row: 2 }, team: TeamType.WHITE, type: PieceType.PAWN },
  { id: 5, image: WHITE_PAWN, position: { column: 'E', row: 2 }, team: TeamType.WHITE, type: PieceType.PAWN },
  { id: 6, image: WHITE_PAWN, position: { column: 'F', row: 2 }, team: TeamType.WHITE, type: PieceType.PAWN },
  { id: 7, image: WHITE_PAWN, position: { column: 'G', row: 2 }, team: TeamType.WHITE, type: PieceType.PAWN },
  { id: 8, image: WHITE_PAWN, position: { column: 'H', row: 2 }, team: TeamType.WHITE, type: PieceType.PAWN },

  { id: 9, image: BLACK_PAWN, position: { column: 'A', row: 7 }, team: TeamType.BLACK, type: PieceType.PAWN },
  { id: 10, image: BLACK_PAWN, position: { column: 'B', row: 7 }, team: TeamType.BLACK, type: PieceType.PAWN },
  { id: 11, image: BLACK_PAWN, position: { column: 'C', row: 7 }, team: TeamType.BLACK, type: PieceType.PAWN },
  { id: 12, image: BLACK_PAWN, position: { column: 'D', row: 7 }, team: TeamType.BLACK, type: PieceType.PAWN },
  { id: 13, image: BLACK_PAWN, position: { column: 'E', row: 7 }, team: TeamType.BLACK, type: PieceType.PAWN },
  { id: 14, image: BLACK_PAWN, position: { column: 'F', row: 7 }, team: TeamType.BLACK, type: PieceType.PAWN },
  { id: 15, image: BLACK_PAWN, position: { column: 'G', row: 7 }, team: TeamType.BLACK, type: PieceType.PAWN },
  { id: 16, image: BLACK_PAWN, position: { column: 'H', row: 7 }, team: TeamType.BLACK, type: PieceType.PAWN },

  { id: 17, image: WHITE_ROOK, position: { column: 'A', row: 1 }, team: TeamType.WHITE, type: PieceType.ROOK },
  { id: 18, image: WHITE_ROOK, position: { column: 'H', row: 1 }, team: TeamType.WHITE, type: PieceType.ROOK },

  { id: 19, image: BLACK_ROOK, position: { column: 'A', row: 8 }, team: TeamType.BLACK, type: PieceType.ROOK },
  { id: 20, image: BLACK_ROOK, position: { column: 'H', row: 8 }, team: TeamType.BLACK, type: PieceType.ROOK },

  { id: 21, image: WHITE_KNIGHT, position: { column: 'B', row: 1 }, team: TeamType.WHITE, type: PieceType.KNIGHT },
  { id: 22, image: WHITE_KNIGHT, position: { column: 'G', row: 1 }, team: TeamType.WHITE, type: PieceType.KNIGHT },

  { id: 23, image: BLACK_KNIGHT, position: { column: 'B', row: 8 }, team: TeamType.BLACK, type: PieceType.KNIGHT },
  { id: 24, image: BLACK_KNIGHT, position: { column: 'G', row: 8 }, team: TeamType.BLACK, type: PieceType.KNIGHT },

  { id: 25, image: WHITE_BISHOP, position: { column: 'C', row: 1 }, team: TeamType.WHITE, type: PieceType.BISHOP },
  { id: 26, image: WHITE_BISHOP, position: { column: 'F', row: 1 }, team: TeamType.WHITE, type: PieceType.BISHOP },

  { id: 27, image: BLACK_BISHOP, position: { column: 'C', row: 8 }, team: TeamType.BLACK, type: PieceType.BISHOP },
  { id: 28, image: BLACK_BISHOP, position: { column: 'F', row: 8 }, team: TeamType.BLACK, type: PieceType.BISHOP },

  { id: 29, image: WHITE_QUEEN, position: { column: 'D', row: 1 }, team: TeamType.WHITE, type: PieceType.QUEEN },
  { id: 30, image: WHITE_KING, position: { column: 'E', row: 1 }, team: TeamType.WHITE, type: PieceType.KING },

  { id: 31, image: BLACK_QUEEN, position: { column: 'D', row: 8 }, team: TeamType.BLACK, type: PieceType.QUEEN },
  { id: 32, image: BLACK_KING, position: { column: 'E', row: 8 }, team: TeamType.BLACK, type: PieceType.KING },
]