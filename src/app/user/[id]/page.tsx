import { fetchUserById } from '@/api';
import React from 'react';
import { faHome, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserSummaryCard from '@/components/UserSummary';
import UserBrickCollection from '@/components/UserBrickCollection';
import UserBuildSets from '@/components/UserBuildSets';
import { ColorProvider } from '@/providers/ColorProvider';
import { Breadcrumbs, Button } from '@/materialui';
import Link from 'next/link';

const User = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await fetchUserById(id);
  const { username, location, brickCount, collection } = user;

  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/user/${id}`}>{`user: ${username}`}</a>
      </Breadcrumbs>
      <ColorProvider apiUrl={process.env.API_URL as string}>
        <div className="flex flex-row">
          <div className="flex flex-col flex-1 px-6">
            <UserSummaryCard user={{ id, username, location, brickCount }} />
            <UserBrickCollection collection={collection} />
          </div>
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
      </ColorProvider>
    </>
  );
};

export default User;
