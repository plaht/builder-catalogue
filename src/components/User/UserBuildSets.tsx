import React from 'react';

import { BuildSetSummary, User } from '@/types';
import { Typography } from '@/materialui';
import { fetchSets } from '@/api';
import UserBuildSetEvaluation from './UserBuildSetEvaluation';

const UserBuildSets = async ({ user }: { user: User }) => {
  const sets = await fetchSets();
  return (
    <>
      <Typography variant="h3" color="blue-gray" className="ml-2 -mb-1">
        Build sets
      </Typography>
      {sets.Sets.map((set: BuildSetSummary) => (
        <UserBuildSetEvaluation key={set.id} user={user} buildSet={set} />
      ))}
    </>
  );
};

export default UserBuildSets;
