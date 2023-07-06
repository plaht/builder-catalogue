import { fetchUserById } from '@/api';
import React from 'react';

import UserSummaryCard from '@/components/UserSummary';
import UserBrickCollection from '@/components/UserBrickCollection';
import UserBuildSets from '@/components/UserBuildSets';
import { ColorProvider } from '@/providers/ColorProvider';

const User = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await fetchUserById(id);
  const { username, location, brickCount, collection } = user;

  return (
    <>
      <ColorProvider apiUrl={process.env.API_URL as string}>
        <div className="flex flex-row">
          <div className="flex flex-col flex-1 p-6">
            <UserSummaryCard user={{ id, username, location, brickCount }} />
            <UserBrickCollection collection={collection} />
          </div>
          <div className="flex flex-col flex-1 p-6 mt-40">
            <UserBuildSets
              user={{ id, username, location, brickCount, collection }}
            />
          </div>
        </div>
      </ColorProvider>
    </>
  );
};

export default User;
