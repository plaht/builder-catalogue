import React from 'react';

import { UserSummary } from '@/types';
import UserSummaryCard from '@/components/User/UserSummaryCard';
import { Card, CardHeader, CardBody, Typography } from '@/materialui';

export interface UserListProps {
  users: UserSummary[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="flex basis-1/2 px-8">
      <Card className="w-full max-w-[39rem] px-3 m-2 bg-blue-200">
        <CardHeader
          floated={false}
          shadow={false}
          className="mx-8 flex items-center gap-4 pt-0 pb-2 bg-inherit"
        >
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h2" color="blue-gray">
                Users
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-2 overflow-hidden">
          {users.map((user: UserSummary) => (
            <UserSummaryCard key={user.id} user={user} />
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default UserList;
