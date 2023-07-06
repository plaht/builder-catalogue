import React from 'react';

import { fetchSets, fetchUsers } from '@/api';
import UserList from '@/components/UserList';
import BuildSetList from '@/components/BuildSetList';

const Home: React.FC = async () => {
  const users = await fetchUsers();
  const sets = await fetchSets();
  return (
    <div className="flex lg:flex-row justify-center">
      <UserList users={users.Users} />
      <BuildSetList sets={sets.Sets} />
    </div>
  );
};

export default Home;
