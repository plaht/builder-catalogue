import * as React from 'react';
import { fetchUsers, fetchUserById } from '@/api';
import { UserSummary, User } from '@/types';
import { flattenCollection, addUserToFlattenedCollection } from '@/utils/megabuilder';

const Megabuilder: React.FC = async () => {
  const username = 'megabuilder99';
  const users = await fetchUsers();
  console.log('users');
  console.log(users);
  const userId = users.Users?.find((user: UserSummary) => user.username === username)?.id;
  console.log(userId);
  const user = await fetchUserById(userId);

  let flatCollection = flattenCollection(user);

  flatCollection = {
    '36840-3': [
        {
            count: 10,
            username: 'megabuilder99',
            userId: 'd174c807-8880-4f49-866b-6e1ec6527ccf'
          }
    ]
  };

  const fullUsers = await Promise.all(
    users.Users.map(async (user: UserSummary) => {
        const fullUser = await fetchUserById(user.id);
        return fullUser;
  }));
  console.log(fullUsers.length);

    fullUsers.forEach((user: User) => {
        if (user.username !== username) {
             addUserToFlattenedCollection(flatCollection, user);
        }
    });
   console.log(flatCollection);


  return (
    <>
      <div> overview </div>
      <div> { `Users: ${users.Users.length}`} </div>
      {/* <div> {JSON.stringify(sets, null, 2)} </div> */}
    </>
  );
};

export default Megabuilder;
