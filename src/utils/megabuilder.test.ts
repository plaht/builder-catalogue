import { User } from '@/types';
import {
  flattenBlockCollection,
  addUserCountsToFlattenedCollection,
  findLargestCommonCollectionInGroup,
  limitCollectionByUserCounts,
} from './megabuilder';
import { comparisonCounts, user, otherUsers } from './megabuilder.testdata';

describe('megabuilder set utils test', () => {
  it('should flatten a users block collection and add user counts to it', () => {
    const flattenedCollection = flattenBlockCollection(user);
    expect(flattenedCollection).toEqual({
      '3029-4': [{ count: 3, username: 'megabuilder99', userId: '41' }],
      '3029-1': [{ count: 1, username: 'megabuilder99', userId: '41' }],
      '5092-4': [{ count: 4, username: 'megabuilder99', userId: '41' }],
      '5092-1': [{ count: 9, username: 'megabuilder99', userId: '41' }],
    });
    expect(otherUsers.length).toBe(2);
    let updatedCollectionWithCounts = addUserCountsToFlattenedCollection(
      flattenedCollection,
      otherUsers[0]
    );
    updatedCollectionWithCounts = addUserCountsToFlattenedCollection(
      flattenedCollection,
      otherUsers[1]
    );
    expect(updatedCollectionWithCounts).toEqual({
      '3029-4': [
        { count: 0, username: 'waffle_horse', userId: '41' },
        { count: 3, username: 'megabuilder99', userId: '41' },
        { count: 6, username: 'superkit', userId: '4005' },
      ],
      '3029-1': [
        { count: 1, username: 'megabuilder99', userId: '41' },
        { count: 1, username: 'waffle_horse', userId: '41' },
        { count: 1, username: 'superkit', userId: '4005' },
      ],
      '5092-4': [
        { count: 0, username: 'waffle_horse', userId: '41' },
        { count: 3, username: 'superkit', userId: '4005' },
        { count: 4, username: 'megabuilder99', userId: '41' },
      ],
      '5092-1': [
        { count: 0, username: 'superkit', userId: '4005' },
        { count: 0, username: 'waffle_horse', userId: '41' },
        { count: 9, username: 'megabuilder99', userId: '41' },
      ],
    });
  });

  it('should return limited collection based on certain users counts', () => {
    // deep copy
    const testdata = JSON.parse(JSON.stringify(comparisonCounts));
    const lc = limitCollectionByUserCounts(testdata, {
      username: 'megabuilder99',
      id: 'd174c807-8880-4f49-866b-6e1ec6527ccf',
    } as User);
    expect(lc['3029-2'].length).toBe(10);
    expect(Math.max(...lc['3029-2'].map((x) => x.count))).toBe(7);
    expect(lc['3029-4'].length).toBe(10);
    expect(Math.max(...lc['3029-4'].map((x) => x.count))).toBe(11);
  });

  it('should find the largest common collection for a given amount of users', () => {
    // deep copy
    const testdata = JSON.parse(JSON.stringify(comparisonCounts));
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
