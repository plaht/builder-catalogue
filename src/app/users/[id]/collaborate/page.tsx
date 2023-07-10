import { fetchUserById } from '@/api';
import React from 'react';
import Link from 'next/link';

import { Textarea, Button, Breadcrumbs } from '@/materialui';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Collaborate = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { collaboratorId: string; setId: string };
}) => {
  const { id } = params;
  const { collaboratorId, setId } = searchParams;
  const [user, collaborator] = await Promise.all([
    fetchUserById(id),
    fetchUserById(collaboratorId),
  ]);

  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/users/${id}`}>{`user: ${user.username}`}</a>
        <a href={`/users/${id}/collaborate?collaboratorId=${collaboratorId}&setId=${setId}`}>
          {`collaborate: ${collaborator.username}`}
        </a>
      </Breadcrumbs>

      <div className="flex flex-row">
        <div className="relative w-[32rem] p-10 gap-6">
          <Textarea
            className="bg-white"
            variant="outlined"
            value={`Dear ${collaborator.username} \n\nDo you want to build a Lego kit? \n`}
            rows={8}
          />
          <div className="w-full flex justify-right py-1.5">
            <div className="flex gap-2">
              <Link href={`/users/${id}/${setId ? `missing/${setId}` : 'custom-build'}`}>
                <Button size="sm" color="red" variant="text" className="rounded-md">
                  Cancel
                </Button>
              </Link>
              <Button size="sm" disabled className="rounded-md">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collaborate;
