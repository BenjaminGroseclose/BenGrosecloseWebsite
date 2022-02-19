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
export const columns = [1, 2, 3, 4, 5, 6, 7, 8];

export const columnMap: { [id: number]: string } = {
  1: 'H',
  2: 'G',
  3: 'F',
  4: 'E',
  5: 'D',
  6: 'C',
  7: 'B',
  8: 'A'
}

export interface Position {
  column: number,
  row: number
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
  MOVING
}

export enum TeamType {
  WHITE,
  BLACK,
  NEUTRAL
}

export enum GameState {
  NOT_STARTED,
  BLACK_CHECKED,
  BLACK_CHECK_MATE,
  WHITE_CHECKED,
  WHITE_CHECK_MATE,
  DRAW,
  NORMAL
}

export interface Piece {
  id: number;
  image: string;
  position: Position;
  pieceType: PieceType;
  team: TeamType;
  enPassant?: boolean;
}

export const initBoardState: Piece[] = [
  { id: 1, image: WHITE_PAWN, position: { column: 1, row: 2 }, team: TeamType.WHITE, pieceType: PieceType.PAWN },
  { id: 2, image: WHITE_PAWN, position: { column: 2, row: 2 }, team: TeamType.WHITE, pieceType: PieceType.PAWN },
  { id: 3, image: WHITE_PAWN, position: { column: 3, row: 2 }, team: TeamType.WHITE, pieceType: PieceType.PAWN },
  { id: 4, image: WHITE_PAWN, position: { column: 4, row: 2 }, team: TeamType.WHITE, pieceType: PieceType.PAWN },
  { id: 5, image: WHITE_PAWN, position: { column: 5, row: 2 }, team: TeamType.WHITE, pieceType: PieceType.PAWN },
  { id: 6, image: WHITE_PAWN, position: { column: 6, row: 2 }, team: TeamType.WHITE, pieceType: PieceType.PAWN },
  { id: 7, image: WHITE_PAWN, position: { column: 7, row: 2 }, team: TeamType.WHITE, pieceType: PieceType.PAWN },
  { id: 8, image: WHITE_PAWN, position: { column: 8, row: 2 }, team: TeamType.WHITE, pieceType: PieceType.PAWN },

  { id: 9, image: BLACK_PAWN, position: { column: 1, row: 7 }, team: TeamType.BLACK, pieceType: PieceType.PAWN },
  { id: 10, image: BLACK_PAWN, position: { column: 2, row: 7 }, team: TeamType.BLACK, pieceType: PieceType.PAWN },
  { id: 11, image: BLACK_PAWN, position: { column: 3, row: 7 }, team: TeamType.BLACK, pieceType: PieceType.PAWN },
  { id: 12, image: BLACK_PAWN, position: { column: 4, row: 7 }, team: TeamType.BLACK, pieceType: PieceType.PAWN },
  { id: 13, image: BLACK_PAWN, position: { column: 5, row: 7 }, team: TeamType.BLACK, pieceType: PieceType.PAWN },
  { id: 14, image: BLACK_PAWN, position: { column: 6, row: 7 }, team: TeamType.BLACK, pieceType: PieceType.PAWN },
  { id: 15, image: BLACK_PAWN, position: { column: 7, row: 7 }, team: TeamType.BLACK, pieceType: PieceType.PAWN },
  { id: 16, image: BLACK_PAWN, position: { column: 8, row: 7 }, team: TeamType.BLACK, pieceType: PieceType.PAWN },

  { id: 17, image: WHITE_ROOK, position: { column: 1, row: 1 }, team: TeamType.WHITE, pieceType: PieceType.ROOK },
  { id: 18, image: WHITE_ROOK, position: { column: 8, row: 1 }, team: TeamType.WHITE, pieceType: PieceType.ROOK },

  { id: 19, image: BLACK_ROOK, position: { column: 1, row: 8 }, team: TeamType.BLACK, pieceType: PieceType.ROOK },
  { id: 20, image: BLACK_ROOK, position: { column: 8, row: 8 }, team: TeamType.BLACK, pieceType: PieceType.ROOK },

  { id: 21, image: WHITE_KNIGHT, position: { column: 2, row: 1 }, team: TeamType.WHITE, pieceType: PieceType.KNIGHT },
  { id: 22, image: WHITE_KNIGHT, position: { column: 7, row: 1 }, team: TeamType.WHITE, pieceType: PieceType.KNIGHT },

  { id: 23, image: BLACK_KNIGHT, position: { column: 2, row: 8 }, team: TeamType.BLACK, pieceType: PieceType.KNIGHT },
  { id: 24, image: BLACK_KNIGHT, position: { column: 7, row: 8 }, team: TeamType.BLACK, pieceType: PieceType.KNIGHT },

  { id: 25, image: WHITE_BISHOP, position: { column: 3, row: 1 }, team: TeamType.WHITE, pieceType: PieceType.BISHOP },
  { id: 26, image: WHITE_BISHOP, position: { column: 6, row: 1 }, team: TeamType.WHITE, pieceType: PieceType.BISHOP },

  { id: 27, image: BLACK_BISHOP, position: { column: 3, row: 8 }, team: TeamType.BLACK, pieceType: PieceType.BISHOP },
  { id: 28, image: BLACK_BISHOP, position: { column: 6, row: 8 }, team: TeamType.BLACK, pieceType: PieceType.BISHOP },

  { id: 29, image: WHITE_QUEEN, position: { column: 4, row: 1 }, team: TeamType.WHITE, pieceType: PieceType.QUEEN },
  { id: 30, image: WHITE_KING, position: { column: 5, row: 1 }, team: TeamType.WHITE, pieceType: PieceType.KING },

  { id: 31, image: BLACK_QUEEN, position: { column: 4, row: 8 }, team: TeamType.BLACK, pieceType: PieceType.QUEEN },
  { id: 32, image: BLACK_KING, position: { column: 5, row: 8 }, team: TeamType.BLACK, pieceType: PieceType.KING }
]