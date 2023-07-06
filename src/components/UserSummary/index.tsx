'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

import { UserSummary } from '@/types';
import { Card, CardHeader, CardBody, Avatar, Typography } from '@/materialui';
import { USER_AVATAR_URL } from '@/utils/constants';

export interface UserSummaryProps {
  user: UserSummary;
}

const UserSummary = ({ user }: UserSummaryProps) => {
  const { id, username, location, brickCount } = user;
  const router = useRouter();

  return (
    <Card
      shadow={false}
      className="max-w-[39rem] px-3 m-2 hover:shadow hover:shadow-lg hover:shadow-grey-800"
      onClick={() => router.push(`/user/${id}`)}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src={USER_AVATAR_URL}
          alt="user avatar"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {username}
            </Typography>
          </div>
          <Typography color="blue-gray">{location}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-2 p-0">
        <div className="flex flex-row justify-end pr-3">
          <Typography variant="h6" color="blue-gray">
            {' '}
            {` ${brickCount}`} <FontAwesomeIcon icon={faCubes} />{' '}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserSummary;
