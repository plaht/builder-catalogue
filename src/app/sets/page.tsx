import React from 'react';

import { fetchSets } from '@/api';
import { BuildSetList } from '@/components/BuildSet';
import { Breadcrumbs } from '@/materialui';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sets: React.FC = async () => {
  const sets = await fetchSets();
  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/sets`}>{`sets`}</a>
      </Breadcrumbs>
      <div className="flex lg:flex-row justify-center">
        <div className="flex flex-col flex-1 p-6">
          <BuildSetList sets={sets.Sets} />
        </div>
      </div>
    </>
  );
};

export default Sets;
