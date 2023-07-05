import { BlockVariation, User } from '@/types';

const flattenCollection = (user: User) => {
  const flattened = user.collection.reduce((acc, piece: BlockVariation) => {
    const variants = piece.variants.reduce((colors, variant) => {
      return {
        ...colors,
        [`${piece.pieceId}-${variant.color}`]: [
          {
            count: variant.count,
            username: user.username,
            userId: user.id,
          },
        ],
      };
    }, {});

    return { ...acc, ...variants };
  }, {});

  return flattened;
};

export interface UserCollectionComparison {
  [key: string]: UserCollectionComparisonPiece[];
}

interface UserCollectionComparisonPiece {
  count: number;
  username: string;
  userId: string;
}

const addUserToFlattenedCollection = (
  flattenedCollection: UserCollectionComparison,
  user: User
) => {
  Object.entries(flattenedCollection).forEach(([key, value]) => {
    const [pieceId, color] = key.split('-');
    const found = user.collection.find((piece) => {
      return piece.pieceId === pieceId;
    });
    if (!found) {
      value.unshift({ count: 0, username: user.username, userId: user.id });
      return;
    }

    const foundColor = found.variants.find((variant) => {
      return variant.color === color;
    });
    if (!foundColor) {
      value.unshift({ count: 0, username: user.username, userId: user.id });
      return;
    }

    let inserted = false;
    for (let idx = 0; idx < value.length; idx++) {
      const item = value[idx];
      if (item.count > foundColor.count) {
        value.splice(idx, 0, {
          count: foundColor.count,
          username: user.username,
          userId: user.id,
        });
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      value.push({
        count: foundColor.count,
        username: user.username,
        userId: user.id,
      });
    }
  });
};

export { flattenCollection, addUserToFlattenedCollection };
