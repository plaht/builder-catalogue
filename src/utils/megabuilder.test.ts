import { User } from '@/types';
import { findLargestCommonCollectionInGroup, limitCollectionByUserCounts } from './megabuilder';

const comparison = {
  '3029-4': [
    {
      count: 0,
      username: 'brickfan35',
      userId: '6d6bc9f2-a762-4a30-8d9a-52cf8d8373fc',
    },
    {
      count: 1,
      username: 'underground-bricks',
      userId: 'b9ccfd73-c222-4e34-a252-1fc3222bbd2f',
    },
    {
      count: 2,
      username: 'green-bricks-only',
      userId: '506ad852-3e42-497e-a14d-99934d4df2e2',
    },
    {
      count: 6,
      username: 'dr_crocodile',
      userId: 'b56c4819-b6b5-422c-a023-5fdffbdf01f2',
    },
    {
      count: 6,
      username: 'landscape-artist',
      userId: '220053f6-8a3a-45b1-8291-a59845c2b1df',
    },
    {
      count: 6,
      username: 'wizard13',
      userId: '7c95658e-05dd-4563-867b-095d5a1edeb5',
    },
    {
      count: 8,
      username: 'spaceman77',
      userId: '2d33d4b3-70a1-4106-ad6c-5028dadc6251',
    },
    {
      count: 9,
      username: 'arts-n-bricks',
      userId: '353555ef-3135-4d3a-8e39-c680e1eb26d2',
    },
    {
      count: 11,
      username: 'megabuilder99',
      userId: 'd174c807-8880-4f49-866b-6e1ec6527ccf',
    },
    {
      count: 13,
      username: 'technical-spike',
      userId: '17053e30-1cfa-4c34-9f37-b541bfc6b316',
    },
    {
      count: 18,
      username: 'captain-pieces',
      userId: '2f10aad6-670e-4b3b-be7f-6a4ab57f232a',
    },
  ],
  '3029-2': [
    {
      count: 0,
      username: 'spaceman77',
      userId: '2d33d4b3-70a1-4106-ad6c-5028dadc6251',
    },
    {
      count: 2,
      username: 'landscape-artist',
      userId: '220053f6-8a3a-45b1-8291-a59845c2b1df',
    },
    {
      count: 3,
      username: 'arts-n-bricks',
      userId: '353555ef-3135-4d3a-8e39-c680e1eb26d2',
    },
    {
      count: 3,
      username: 'wizard13',
      userId: '7c95658e-05dd-4563-867b-095d5a1edeb5',
    },
    {
      count: 4,
      username: 'technical-spike',
      userId: '17053e30-1cfa-4c34-9f37-b541bfc6b316',
    },
    {
      count: 7,
      username: 'megabuilder99',
      userId: 'd174c807-8880-4f49-866b-6e1ec6527ccf',
    },
    {
      count: 9,
      username: 'brickfan35',
      userId: '6d6bc9f2-a762-4a30-8d9a-52cf8d8373fc',
    },
    {
      count: 9,
      username: 'dr_crocodile',
      userId: 'b56c4819-b6b5-422c-a023-5fdffbdf01f2',
    },
    {
      count: 11,
      username: 'green-bricks-only',
      userId: '506ad852-3e42-497e-a14d-99934d4df2e2',
    },
    {
      count: 13,
      username: 'underground-bricks',
      userId: 'b9ccfd73-c222-4e34-a252-1fc3222bbd2f',
    },
    {
      count: 15,
      username: 'captain-pieces',
      userId: '2f10aad6-670e-4b3b-be7f-6a4ab57f232a',
    },
  ],
};

describe('megabuilder set utils test', () => {
  it('should return limited collection based on certain users counts', () => {
    // deep copy
    const testdata = JSON.parse(JSON.stringify(comparison));
    const lc = limitCollectionByUserCounts(testdata, {
      username: 'megabuilder99',
      id: 'd174c807-8880-4f49-866b-6e1ec6527ccf',
    } as User);
    expect(lc['3029-2'].length).toBe(10);
    expect(Math.max(...lc['3029-2'].map((x) => x.count))).toBe(7);
    expect(lc['3029-4'].length).toBe(10);
    expect(Math.max(...lc['3029-4'].map((x) => x.count))).toBe(11);
  });

  it.only('should find the largest common collection for a given amount of users', () => {
    // deep copy
    const testdata = JSON.parse(JSON.stringify(comparison));
    const lc = limitCollectionByUserCounts(testdata, {
      username: 'megabuilder99',
      id: 'd174c807-8880-4f49-866b-6e1ec6527ccf',
    } as User);
    const set = findLargestCommonCollectionInGroup(lc, 4);
    expect(set.collection.length).toBe(2);
    expect(set.users.length).toBe(4);
    expect(set.users).toEqual(['dr_crocodile', 'wizard13', 'arts-n-bricks', 'technical-spike']);
    expect(set.totalBlocks).toBe(9);
  });
});
