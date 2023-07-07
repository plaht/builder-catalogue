import React from 'react';

import { BlockPiece, UserSummary, User } from '@/types';
import Collaborator from './Collaborator';
import { Typography } from '@/materialui';
import { fetchUsers, fetchUserById } from '@/api';
import { canUserCompleteMissingPieces } from '@/utils/users';

const CollaboratorList = async ({
  userId,
  missingPieces,
  setId,
}: {
  setId: string;
  userId: string;
  missingPieces: BlockPiece[];
}) => {
  const users = await fetchUsers();
  const otherUsers = users?.Users?.filter(
    (user: UserSummary) => user.id !== userId
  );
  const allOtherUsers = await Promise.all(
    otherUsers.map(async ({ id }: UserSummary) => {
      const user = await fetchUserById(id);
      return user;
    })
  );

  const allOtherUsersThatHaveMissingPieces = allOtherUsers
    .map((user: User) => {
      const { hasAllPieces } = canUserCompleteMissingPieces(
        user,
        missingPieces
      );
      return { ...user, hasAllPieces };
    })
    .filter((user: User & { hasAllPieces: boolean }) => user.hasAllPieces);

  return (
    <>
      <Typography variant="h3" color="blue-gray" className="ml-2">
        Collaborators
      </Typography>
      <Typography variant="small" color="blue-gray" className="ml-2 mb-2">
        These users have the pieces you need to complete this set.
      </Typography>
      {allOtherUsersThatHaveMissingPieces.map((user: User) => (
        <Collaborator
          key={user.id}
          initialUserId={userId}
          user={user}
          setId={setId}
        />
      ))}
    </>
  );
};

export default CollaboratorList;
