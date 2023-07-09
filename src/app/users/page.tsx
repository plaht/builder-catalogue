import React from 'react';

import { fetchUsers } from '@/api';
import { UserList } from '@/components/User';
import { Breadcrumbs } from '@/materialui';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Users: React.FC = async () => {
  const users = await fetchUsers();
  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/user`}>{`users`}</a>
      </Breadcrumbs>
      <div className="flex lg:flex-row justify-center">
        <div className="flex flex-col flex-1 p-6">
          <UserList users={users.Users} />
        </div>
      </div>
    </>
  );
};

export default Users;
