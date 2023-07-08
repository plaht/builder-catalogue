import { canUserBuildSet, canUserCompleteMissingPieces } from './users';

const user = {
  id: '123',
  username: 'guido',
  location: 'UK',
  brickCount: 100,
  collection: [
    {
      pieceId: '3001',
      variants: [
        {
          color: '1',
          count: 10,
        },
        {
          color: '2',
          count: 10,
        },
      ],
    },
    {
      pieceId: '3002',
      variants: [
        {
          color: '1',
          count: 10,
        },
        {
          color: '2',
          count: 10,
        },
      ],
    },
  ],
};

const user2 = {
  id: '456',
  username: 'hatzis',
  location: 'UK',
  brickCount: 100,
  collection: [
    {
      pieceId: '3001',
      variants: [
        {
          color: '1',
          count: 6 ,
        },
        {
          color: '5',
          count: 11,
        },
      ],
    },
    {
      pieceId: '8790',
      variants: [
        {
          color: '1',
          count: 10,
        },
        {
          color: '2',
          count: 10,
        },
      ],
    },
  ],
};

const buildSet = {
  id: '123',
  name: 'test',
  setNumber: '123',
  totalPieces: 100,
  pieces: [
    {
      part: {
        designID: '3001',
        material: 1,
        partType: 'rigid',
      },
      quantity: 8,
    },
    {
      part: {
        designID: '3002',
        material: 1,
        partType: 'rigid',
      },
      quantity: 7,
    },
  ],
};

describe('users utils test', () => {
  it('should return false when the user can not complete the set', () => {
    const result = canUserBuildSet(user2, buildSet);
    expect(result.hasAllPieces).toBe(false);
    expect(result.missingPieces).toEqual([
      { part: { designID: '3001', material: 1, partType: 'rigid' }, quantity: 2 },
      { part: { designID: '3002', material: 1, partType: 'rigid' }, quantity: 7 },
    ]);
  });

  it('should return true when the user can complete the set', () => {
    const result = canUserBuildSet(user, buildSet);
    expect(result.hasAllPieces).toBe(true);
    expect(result.missingPieces).toEqual([]);
  });
});
