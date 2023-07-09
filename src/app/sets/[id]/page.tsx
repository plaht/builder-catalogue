import React from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchSetById, fetchColours } from '@/api';
import { Breadcrumbs, Button } from '@/materialui';
import { BuildSetDetails } from '@/components/BuildSet';

const BuildSet = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const set = await fetchSetById(id);
  console.log(set);
  const colours = await fetchColours();
  const { name } = set;

  return (
    <>
      <Breadcrumbs className="ml-2 mt-2">
        <a href="/">
          <FontAwesomeIcon icon={faHome} />
        </a>
        <a href={`/sets/${id}`}>{`set: ${name}`}</a>
      </Breadcrumbs>
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 px-6">
          <BuildSetDetails buildSet={set} colourLibrary={colours} />
        </div>
      </div>
    </>
  );
};

export default BuildSet;
