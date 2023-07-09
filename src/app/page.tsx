import React from 'react';

import { fetchSets, fetchUsers } from '@/api';
import { UserList } from '@/components/User';
import { BuildSetList } from '@/components/BuildSet';

const Home: React.FC = async () => {
  const users = await fetchUsers();
  const sets = await fetchSets();
  return (
    <>
      <div className="flex lg:flex-row justify-center">
        <div className="flex flex-col flex-1 p-6">
          <UserList users={users.Users} />
        </div>
        <div className="flex hidden lg:block flex-col flex-1 p-6">
          <BuildSetList sets={sets.Sets} />
        </div>
      </div>
      <div className="flex block lg:hidden flex-row justify-center">
        <div className="flex flex-col flex-1 p-6">
          <BuildSetList sets={sets.Sets} />
        </div>
      </div>
    </>
  );
};

export default Home;
