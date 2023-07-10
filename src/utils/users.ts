import { BlockPiece, User, BuildSet } from '@/types';

export interface UserOwnsAllPiecesResult {
  hasAllPieces: boolean;
  missingPieces: BlockPiece[];
}

const userOwnsAllPieces = (user: User, pieces: BlockPiece[]): UserOwnsAllPiecesResult => {
  const missingPieces: BlockPiece[] = [];

  pieces.forEach((piece) => {
    const found = user.collection.find((collectionPiece) => {
      return collectionPiece.pieceId === piece.part.designID;
    });

    if (!found) {
      missingPieces.push(piece);
      return;
    }

    const hasColor = found.variants.find((variant) => {
      return variant.color === piece.part.material.toString();
    });
    if (!hasColor) {
      missingPieces.push(piece);
      return;
    }

    const hasQuantity = hasColor.count >= piece.quantity;
    if (!hasQuantity) {
      const missingPiece = {
        ...piece,
        quantity: piece.quantity - hasColor.count,
      };
      missingPieces.push(missingPiece);
      return;
    }
  });

  return {
    hasAllPieces: missingPieces.length === 0,
    missingPieces,
  };
};

const canUserBuildSet = (user: User, set: BuildSet): UserOwnsAllPiecesResult => {
  return userOwnsAllPieces(user, set.pieces);
};

const canUserCompleteMissingPieces = (user: User, missingPieces: BlockPiece[]) => {
  return userOwnsAllPieces(user, missingPieces);
};

export { canUserBuildSet, canUserCompleteMissingPieces };
