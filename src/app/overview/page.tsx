import * as React from 'react';
import { fetchUsers, fetchSets, fetchSetById, fetchUserById } from '@/api';
import { UserSummary, BuildSetSummary } from '@/types';
import { canUserBuildSet } from '@/utils/users';

const Overview: React.FC = async () => {
  const username = 'brickfan35';
  const setname = 'undersea-monster';
  const users = await fetchUsers();
  const userId = users.Users?.find(
    (user: UserSummary) => user.username === username
  )?.id;
  const user = await fetchUserById(userId);
  const sets = await fetchSets();
  const setId = sets.Sets?.find(
    (set: BuildSetSummary) => set.name === setname
  )?.id;
  const set = await fetchSetById(setId);

  const result = canUserBuildSet(user, set);
  console.log(result);

  return (
    <>
      <div> overview </div>
      <div> {`Users: ${users.Users.length}`} </div>
      {/* <div> {JSON.stringify(sets, null, 2)} </div> */}
    </>
  );
};

export default Overview;
