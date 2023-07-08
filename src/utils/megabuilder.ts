import { BlockPiece, BlockVariation, User } from '@/types';
import { combinations } from './combinations';
import { buildBlockPiece } from './block';

interface UserBlockCount {
  count: number;
  username: string;
  userId: string;
}

export interface UserBlockCountLookup {
  [blockColorKey: string]: UserBlockCount[];
}

const flattenBlockCollection = (user: User): UserBlockCountLookup => {
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

const addUserToFlattenedCollection = (flattenedCollection: UserBlockCountLookup, user: User) => {
  const { username, id, collection } = user;
  Object.entries(flattenedCollection).forEach(([coloredPiece, counts]) => {
    const [pieceId, color] = coloredPiece.split('-');
    const foundPiece = collection.find((piece) => {
      return piece.pieceId === pieceId;
    });
    if (!foundPiece) {
      counts.unshift({ count: 0, username, userId: id });
      return;
    }

    const foundColor = foundPiece.variants.find((variant) => {
      return variant.color === color;
    });
    if (!foundColor) {
      counts.unshift({ count: 0, username, userId: id });
      return;
    }

    let inserted = false;
    for (let idx = 0; idx < counts.length; idx++) {
      const item = counts[idx];
      if (item.count > foundColor.count) {
        counts.splice(idx, 0, {
          count: foundColor.count,
          username,
          userId: id,
        });
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      counts.push({
        count: foundColor.count,
        username,
        userId: id,
      });
    }
  });
  return flattenedCollection;
};

const limitCollectionByUserCounts = (flattenedCollection: UserBlockCountLookup, user: User) => {
  const { username, id } = user;
  return Object.entries(flattenedCollection).reduce(
    (limitedCollection: UserBlockCountLookup, [coloredPiece, orderedCounts]) => {
      const userIndex = orderedCounts.findIndex((item) => {
        return item.username === username && item.userId === id;
      });

      const [foundUser] = orderedCounts.splice(userIndex, 1);
      const userCount = foundUser.count;

      const limitedCounts = orderedCounts.map((item) => {
        return item.count <= userCount
          ? item
          : {
              ...item,
              count: userCount,
            };
      });

      limitedCollection[coloredPiece] = limitedCounts;
      return limitedCollection;
    },
    {}
  );
};

const findMaximumBlocksShareAmongUsers = (
  userBlockCounts: UserBlockCountLookup,
  targetUsernames: string[]
) => {
  const collection: BlockPiece[] = [];
  const totalBlocks = Object.entries(userBlockCounts).reduce(
    (collectedTotal, [colouredPiece, orderedCounts]) => {
      const counts = orderedCounts
        .filter((items) => targetUsernames.includes(items.username))
        .map((item) => item.count);
      const minimumCommonCount = Math.min(...counts);
      collection.push(buildBlockPiece(colouredPiece, minimumCommonCount));
      return collectedTotal + minimumCommonCount;
    },
    0
  );
  return { totalBlocks, users: targetUsernames, collection };
};

const findLargestCommonCollectionInGroup = (
  limitedCollection: UserBlockCountLookup,
  numberOfUsers: number
) => {
  const users = Object.values(limitedCollection)[0].map((item) => item.username);
  const userCombinations = combinations(users, numberOfUsers);
  let largestCollection: {
    totalBlocks: number;
    users: string[];
    collection: BlockPiece[];
  } = { totalBlocks: 0, users: [], collection: [] };
  userCombinations.forEach((userCombination) => {
    const collection = findMaximumBlocksShareAmongUsers(limitedCollection, userCombination);
    if (collection.totalBlocks > largestCollection.totalBlocks) {
      largestCollection = collection;
    }
  });

  largestCollection.collection = largestCollection.collection.filter(
    (piece: BlockPiece) => piece.quantity > 0
  );
  return largestCollection;
};

export {
  flattenBlockCollection,
  addUserToFlattenedCollection,
  limitCollectionByUserCounts,
  findLargestCommonCollectionInGroup,
};
