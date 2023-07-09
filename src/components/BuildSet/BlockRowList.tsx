import React from 'react';

import { BlockPiece, ColourLibrary } from '@/types';
import BlockRow from './BlockRow';

const BlockRowList = ({
  piecesToList,
  hasMissingPieces = false,
  colourLibrary,
}: {
  piecesToList: BlockPiece[];
  hasMissingPieces?: boolean;
  colourLibrary: ColourLibrary;
}) => {
  return (
    <table className="w-full min-w-max table-auto text-left">
      <tbody>
        {piecesToList.map((piece, index) => {
          const isLast = index === piecesToList.length - 1;
          const classes = isLast ? 'p-2' : 'p-2 border-b border-blue-gray-50';

          return (
            <BlockRow
              key={`${piece.part.designID}-${piece.part.material}`}
              classes={classes}
              colours={colourLibrary}
              blockPiece={piece}
              missing={hasMissingPieces}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default BlockRowList;
