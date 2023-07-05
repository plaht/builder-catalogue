import React from 'react';

import { BlockVariation } from '@/types';
import UserBlockSummary from './UserBlockSummary';

const UserBrickCollection = ({
  collection,
}: {
  collection: BlockVariation[];
}) => {
  return (
    <>
      {collection.map((block: BlockVariation) => (
        <UserBlockSummary key={block.pieceId} block={block} />
      ))}
    </>
  );
};

export default UserBrickCollection;
