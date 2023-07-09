import React from 'react';
import { faHome, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import { fetchColours, fetchUserById, fetchUsers } from '@/api';
import { UserSummaryCard, CollaboratorList } from '@/components/User';
import { Breadcrumbs, Button } from '@/materialui';
import {
  addUserToFlattenedCollection,
  findLargestCommonCollectionInGroup,
  flattenBlockCollection,
  limitCollectionByUserCounts,
} from '@/utils/megabuilder';
import CoverageSelect from '@/components/CoverageSelect';
import { UserSummary, User, BlockPiece, BuildSet } from '@/types';
import { BuildSetDetails } from '@/components/BuildSet';

const CustomBuild = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await fetchUserById(id);
  const users = await fetchUsers();
  const colours = await fetchColours();
  const { username, location, brickCount, collection } = user;

  let flatCollection = flattenBlockCollection(user);
  const fullUsers = await Promise.all(
    users.Users.map(async (user: UserSummary) => {
      const fullUser = await fetchUserById(user.id);
      return fullUser;
    })
  );

  fullUsers.forEach((user: User) => {
    if (user.username !== username) {
      addUserToFlattenedCollection(flatCollection, user);
    }
  });

  const collectionLimitedByUser = limitCollectionByUserCounts(flatCollection, user);
  const proposedSet = findLargestCommonCollectionInGroup(collectionLimitedByUser, 5);

  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/user/${id}`}>{`user: ${username}`}</a>
        <a href={`/user/${id}/custom-build`}>{`custom build`}</a>
      </Breadcrumbs>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 px-6">
          <UserSummaryCard user={{ id, username, location, brickCount }} />
          <div className="block lg:hidden">
            <div className="w-48">
              <CoverageSelect />
            </div>
            <Link href={`/user/${id}/custom-build`}>
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
            <CoverageSelect />
          </div>
          <Link href={`/user/${id}/custom-build`}>
            <Button size="sm" color="teal" disabled className="flex items-center gap-3 mt-4">
              <FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" strokeWidth={2} />
              Generate Build
            </Button>
          </Link>
          <div className="flex flex-col flex-1 p-6">
            <BuildSetDetails
              buildSet={{ totalPieces: proposedSet.totalBlocks } as BuildSet}
              missingPieces={proposedSet.collection as BlockPiece[]}
              colourLibrary={colours}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row block lg:hidden">
        <div className="flex flex-col flex-1 px-6 mt-4">
          <div className="flex flex-col flex-1 p-6">
            <BuildSetDetails
              buildSet={{ totalPieces: proposedSet.totalBlocks } as BuildSet}
              missingPieces={proposedSet.collection as BlockPiece[]}
              colourLibrary={colours}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomBuild;
