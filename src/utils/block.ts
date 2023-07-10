import { BlockPiece } from '@/types';
import { Block } from 'typescript';

const decomposeBlockKey = (blockPieceKey: string) => {
  return blockPieceKey.split('-');
};

const buildBlockPiece = (blockPieceKey: string, count: number): BlockPiece => {
  const [designID, material] = decomposeBlockKey(blockPieceKey);
  return {
    part: {
      designID,
      material: parseInt(material, 10),
      partType: 'rigid',
    },
    quantity: count,
  };
};

const totalMissingPiecesReducer = (sum: number, piece: BlockPiece) => sum + piece.quantity;

export { decomposeBlockKey, buildBlockPiece, totalMissingPiecesReducer };
