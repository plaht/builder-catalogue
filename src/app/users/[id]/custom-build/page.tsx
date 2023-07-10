import React from 'react';
import { faHome, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import { fetchColours, fetchUserById, fetchUsers } from '@/api';
import { UserSummaryCard, CollaboratorList } from '@/components/User';
import { Breadcrumbs, Button, Typography } from '@/materialui';
import {
  addUserCountsToFlattenedCollection,
  findLargestCommonCollectionInGroup,
  flattenBlockCollection,
  limitCollectionByUserCounts,
} from '@/utils/megabuilder';
import CoverageSelect from '@/components/CoverageSelect';
import { UserSummary, User, BlockPiece, BuildSet } from '@/types';
import { BuildSetDetails } from '@/components/BuildSet';

const CustomBuild = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { coverage: string };
}) => {
  const { id } = params;
  const { coverage = '50' } = searchParams;
  const [user, userSummaries, colours] = await Promise.all([
    fetchUserById(id),
    fetchUsers(),
    fetchColours(),
  ]);
  const { username, location, brickCount } = user;

  const users = await Promise.all(
    userSummaries.Users.map(async (user: UserSummary) => {
      const fullUser = await fetchUserById(user.id);
      return fullUser;
    })
  );

  const minimumUsers = Math.floor((users.length * parseInt(coverage)) / 100);

  let flatCollection = flattenBlockCollection(user);
  users.forEach((user: User) => {
    if (user.id !== id) {
      addUserCountsToFlattenedCollection(flatCollection, user);
    }
  });

  const collectionLimitedByUser = limitCollectionByUserCounts(flatCollection, user);
  const proposedSet = findLargestCommonCollectionInGroup(collectionLimitedByUser, minimumUsers);

  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/users/${id}`}>{`user: ${username}`}</a>
        <a href={`/users/${id}/custom-build`}>{`custom build`}</a>
      </Breadcrumbs>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 px-6">
          <Typography variant="h3" className="mt-4">
            Custom build
          </Typography>
          <Typography variant="lead" className="mb-4">
            {`${proposedSet.users.length} users (${coverage}%) are able to build a set containing ${proposedSet.totalBlocks} pieces from your collection`}
          </Typography>
          <UserSummaryCard user={{ id, username, location, brickCount }} />
          <div className="block lg:hidden">
            <div className="w-48">
              <CoverageSelect value={coverage} />
            </div>
            <Link href={`/users/${id}/custom-build`}>
              <Button size="sm" color="teal" disabled className="flex items-center gap-3 mt-4">
                <FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" strokeWidth={2} />
                Generate Build
              </Button>
            </Link>
          </div>
          <CollaboratorList
            userId={id}
            missingPieces={proposedSet.collection as BlockPiece[]}
            setId={''}
          />
        </div>
        <div className="flex hidden lg:block flex-col flex-1 px-6 mt-4">
          <div className="w-48">
            <CoverageSelect value={coverage} />
          </div>
          <Link href={`/users/${id}/custom-build`}>
            <Button size="sm" color="teal" disabled className="flex items-center gap-3 mt-4">
              <FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" strokeWidth={2} />
              Submit Build
            </Button>
          </Link>
          <div className="flex flex-col flex-1 p-6">
            <BuildSetDetails
              buildSet={
                { totalPieces: proposedSet.totalBlocks, pieces: proposedSet.collection } as BuildSet
              }
              colourLibrary={colours}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row block lg:hidden">
        <div className="flex flex-col flex-1 px-6 mt-4">
          <div className="flex flex-col flex-1 p-6">
            <BuildSetDetails
              buildSet={
                { totalPieces: proposedSet.totalBlocks, pieces: proposedSet.collection } as BuildSet
              }
              colourLibrary={colours}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomBuild;
