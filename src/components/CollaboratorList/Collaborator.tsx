import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faHandshake } from '@fortawesome/free-solid-svg-icons';

import { User } from '@/types';
import { Button, Card, CardHeader, CardBody, Avatar, Typography } from '@/materialui';
import { USER_AVATAR_URL } from '@/utils/constants';

export interface CollaboratorProps {
  initialUserId: string;
  user: User;
  setId: string;
}

const Collaborator = ({ initialUserId, user, setId }: CollaboratorProps) => {
  const { id, username, location, brickCount } = user;
  return (
    <Card shadow={false} className="max-w-[39rem] px-3 m-2 hover:shadow hover:shadow-grey-800">
      <CardHeader floated={false} shadow={false} className="mx-0 flex items-center gap-4 pt-0 pb-8">
        <Avatar size="lg" variant="circular" src={USER_AVATAR_URL} alt="user avatar" />
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
          <div className="flex flex-col w-1/3 items-start mb-2">
            <Link href={`/user/${initialUserId}/collaborate?collaboratorId=${id}&setId=${setId}`}>
              <Button size="sm" color="green" className="flex items-center gap-3">
                <FontAwesomeIcon icon={faHandshake} className="h-5 w-5" strokeWidth={2} />
                Collaborate
              </Button>
            </Link>
          </div>
          <div className="flex flex-col w-2/3 items-end">
            <Typography variant="h6" color="blue-gray" className="mt-2">
              {' '}
              {` ${brickCount}`} <FontAwesomeIcon color="green" icon={faCubes} />{' '}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Collaborator;
