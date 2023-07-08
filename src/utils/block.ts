import { BlockPiece } from '@/types';

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

export { decomposeBlockKey, buildBlockPiece };
