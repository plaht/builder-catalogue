import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

import { BlockPiece } from '@/types';
import { Typography } from '@/materialui';
import { useColorContext } from '@/providers/ColorProvider';
import { getBrickUrl } from '@/utils/url';

const BlockRow = ({ blockPiece, classes }: { blockPiece: BlockPiece; classes: string }) => {
  const { part, quantity } = blockPiece;
  const { colorMap } = useColorContext();
  const { designID, material } = part;

  const blockUrl = getBrickUrl(designID, material.toString());
  const fallbackUrl = getBrickUrl(designID, '3');

  const [imgSrc, setImgSrc] = useState<string>(blockUrl);

  return (
    <tr key={part.designID}>
      <td className={classes}>
        <div className="flex flex-row">
          <Image
            src={imgSrc}
            height={30}
            width={30}
            style={{ objectFit: 'contain' }}
            onError={() => {
              if (imgSrc !== fallbackUrl) {
                setImgSrc(fallbackUrl);
              } else {
                setImgSrc('/no-image-placeholder.svg');
              }
            }}
            alt={`block piece id ${designID}`}
          />

          <Typography variant="small" color="blue-gray" className="font-normal ml-3">
            {`Design ID: ${designID}  (${colorMap[material.toString()]})`}
          </Typography>
        </div>
      </td>
      <td className={`${classes}`}>
        <div className="text-end">
          <Typography variant="paragraph" color="blue-gray" className="font-normal">
            {quantity} <FontAwesomeIcon icon={faCubes} />{' '}
          </Typography>
        </div>
      </td>
    </tr>
  );
};

export default BlockRow;
