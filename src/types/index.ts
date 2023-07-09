export interface UserSummary {
  id: string;
  username: string;
  location: string;
  brickCount: number;
}

export interface User extends UserSummary {
  collection: BlockVariation[];
}

export interface BuildSetSummary {
  id: string;
  name: string;
  setNumber: string;
  totalPieces: number;
}

export interface ColourLibrary {
  colours: ColourCode[];
  disclaimer: string;
}

export interface ColourCode {
  name: string;
  code: number;
}

export interface BuildSet extends BuildSetSummary {
  pieces: BlockPiece[];
}

export interface BlockPiece {
  part: BlockPart;
  quantity: number;
}

export interface BlockPart {
  designID: string;
  material: number;
  partType: string;
}

export interface BlockVariation {
  pieceId: string;
  variants: ColorTally[];
}

export interface ColorTally {
  color: string;
  count: number;
}
