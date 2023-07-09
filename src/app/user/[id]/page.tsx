import React from 'react';
import { faHome, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserSummaryCard, UserBlockCollection, UserBuildSets } from '@/components/User';
import { fetchUserById, fetchColours } from '@/api';
import { Breadcrumbs, Button } from '@/materialui';
import Link from 'next/link';

const User = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await fetchUserById(id);
  const colours = await fetchColours();
  const { username, location, brickCount, collection } = user;

  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/user/${id}`}>{`user: ${username}`}</a>
      </Breadcrumbs>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 px-6">
          <UserSummaryCard user={{ id, username, location, brickCount }} />
          <UserBlockCollection collection={collection} colourLibrary={colours} />
        </div>
        <div className="flex hidden lg:block flex-col flex-1 px-6 mt-4">
          <Link href={`/user/${id}/custom-build`}>
            <Button size="sm" color="teal" className="flex items-center gap-3 ml-2 mb-28">
              <FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" strokeWidth={2} />
              Custom Build
            </Button>
          </Link>
          <UserBuildSets user={{ id, username, location, brickCount, collection }} />
        </div>
      </div>
      <div className="flex flex-row block lg:hidden">
        <div className="flex flex-col flex-1 px-6 mt-4">
          <Link href={`/user/${id}/custom-build`}>
            <Button size="sm" color="teal" className="flex items-center gap-3 ml-2 mb-28">
              <FontAwesomeIcon icon={faCirclePlus} className="h-5 w-5" strokeWidth={2} />
              Custom Build
            </Button>
          </Link>
          <UserBuildSets user={{ id, username, location, brickCount, collection }} />
        </div>
      </div>
    </>
  );
};

export default User;
