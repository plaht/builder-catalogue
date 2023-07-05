import { fetchUserById } from '@/api';
import React from 'react';

import UserSummaryCard from '@/components/UserSummary';
import UserBrickCollection from '@/components/UserBrickCollection';
import { ColorProvider } from '@/providers/ColorProvider';

const User = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await fetchUserById(id);
  const { username, location, brickCount, collection } = user;

  console.log(user);

  return (
    <>
      <ColorProvider apiUrl={process.env.API_URL as string}>
        <UserSummaryCard user={{ id, username, location, brickCount }} />
        <UserBrickCollection collection={collection} />
      </ColorProvider>
    </>
  );
};

export default User;
