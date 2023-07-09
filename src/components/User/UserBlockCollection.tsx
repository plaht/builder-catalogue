import React from 'react';

import { BlockVariation, ColourLibrary } from '@/types';
import UserBlockSummary from './UserBlockSummary';
import { Typography } from '@/materialui';

const UserBlocCollection = ({ collection, colourLibrary }: { collection: BlockVariation[], colourLibrary: ColourLibrary }) => {
  return (
    <>
      <Typography variant="h3" color="blue-gray" className="ml-2">
        Brick Collection
      </Typography>
      {collection.map((block: BlockVariation) => (
        <UserBlockSummary key={block.pieceId} block={block} colourLibrary={colourLibrary} />
      ))}
    </>
  );
};

export default UserBlocCollection;
