import { fetchUserById, fetchSetById } from '@/api';
import React from 'react';

import UserSummaryCard from '@/components/UserSummary';
import BuildSetDetails from '@/components/BuildSetDetails';
import { ColorProvider } from '@/providers/ColorProvider';
import { canUserBuildSet } from '@/utils/users';
import { BlockPiece } from '@/types';

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
      <ColorProvider apiUrl={process.env.API_URL as string}>
        <div className="flex flex-row">
          <div className="flex flex-col flex-1 p-6">
            <UserSummaryCard user={{ id, username, location, brickCount }} />
            {/* <Collaborators /> */}
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
