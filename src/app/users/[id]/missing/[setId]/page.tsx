import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchUserById, fetchSetById, fetchColours } from '@/api';
import { UserSummaryCard, CollaboratorList } from '@/components/User';
import { BuildSetDetails } from '@/components/BuildSet';
import { canUserBuildSet } from '@/utils/users';
import { BlockPiece } from '@/types';
import { Breadcrumbs } from '@/materialui';

const UserMissingBuildSet = async ({ params }: { params: { id: string; setId: string } }) => {
  const { id, setId } = params;
  const user = await fetchUserById(id);
  const set = await fetchSetById(setId);
  const colours = await fetchColours();
  const { username, location, brickCount } = user;
  const { missingPieces } = canUserBuildSet(user, set);

  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/users/${id}`}>{`user: ${user.username}`}</a>
        <a href={`/users/${id}/missing/${setId}`}>{`set: ${set.name}`}</a>
      </Breadcrumbs>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 p-6">
          <UserSummaryCard user={{ id, username, location, brickCount }} />
          <CollaboratorList
            userId={id}
            missingPieces={missingPieces as BlockPiece[]}
            setId={setId}
          />
        </div>
        <div className="flex hidden lg:block flex-col flex-1 p-6">
          <BuildSetDetails
            buildSet={set}
            missingPieces={missingPieces as BlockPiece[]}
            colourLibrary={colours}
          />
        </div>
      </div>
      <div className="flex flex-row block lg:hidden">
        <div className="flex flex-col flex-1 p-6">
          <BuildSetDetails
            buildSet={set}
            missingPieces={missingPieces as BlockPiece[]}
            colourLibrary={colours}
          />
        </div>
      </div>
    </>
  );
};

export default UserMissingBuildSet;
