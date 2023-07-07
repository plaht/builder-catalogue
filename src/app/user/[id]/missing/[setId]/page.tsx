import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchUserById, fetchSetById } from '@/api';
import UserSummaryCard from '@/components/UserSummary';
import BuildSetDetails from '@/components/BuildSetDetails';
import CollaboratorList from '@/components/CollaboratorList';
import { ColorProvider } from '@/providers/ColorProvider';
import { canUserBuildSet } from '@/utils/users';
import { BlockPiece } from '@/types';
import { Breadcrumbs } from '@/materialui';

const UserMissingBuildSet = async ({
  params,
}: {
  params: { id: string; setId: string };
}) => {
  const { id, setId } = params;
  const user = await fetchUserById(id);
  const set = await fetchSetById(setId);
  const { username, location, brickCount } = user;
  const { missingPieces } = canUserBuildSet(user, set);

  return (
    <>
    <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/user/${id}`}>{`user: ${user.username}`}</a>
        <a
          href={`/user/${id}/missing/${setId}`}
        >
          {`set: ${set.name}`}
        </a>
      </Breadcrumbs>
    <ColorProvider apiUrl={process.env.API_URL as string}>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 p-6">
          <UserSummaryCard user={{ id, username, location, brickCount }} />
          <CollaboratorList
            userId={id}
            missingPieces={missingPieces as BlockPiece[]}
            setId={setId}
          />
        </div>
        <div className="flex flex-col flex-1 p-6">
          <BuildSetDetails
            buildSet={set}
            missingPieces={missingPieces as BlockPiece[]}
          />
        </div>
      </div>
    </ColorProvider>
    </>
  );
};

export default UserMissingBuildSet;
