'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

import { BlockVariation, ColourLibrary } from '@/types';
import { getBrickUrl } from '@/utils/url';
import { buildColourMap } from '@/utils/colours';
import { Card, Typography, Accordion, AccordionHeader, AccordionBody } from '@/materialui';

const UserBlockSummary = ({ block, colourLibrary }: { block: BlockVariation, colourLibrary: ColourLibrary }) => {
  const { pieceId, variants } = block;
  const colourMap = buildColourMap(colourLibrary);

  const blockUrl = getBrickUrl(pieceId, variants[0]?.color);
  const fallbackUrl = getBrickUrl(pieceId, '3');

  const [imgSrc, setImgSrc] = useState<string>(blockUrl);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Card shadow={true} className="max-w-[39rem] px-3 mx-2 my-1">
      <Accordion open={open}>
        <AccordionHeader onClick={() => handleOpen()}>
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
            alt={`block piece id ${pieceId}`}
          />
          <div className="flex w-full  flex-row gap-0.5">
            <div className="flex ml-4  w-2/3 items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                {`Piece ID: ${pieceId}`}
              </Typography>
            </div>
            <div className="flex w-1/3 justify-end">
              <Typography variant="h6" color="blue-gray">
                {' '}
                {` ${variants.reduce((acc, v) => acc + v.count, 0)}`}{' '}
                <FontAwesomeIcon icon={faCubes} />{' '}
              </Typography>
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <table className="w-full min-w-max table-auto text-left">
            <tbody>
              {variants.map(({ color, count }, index) => {
                const isLast = index === variants.length - 1;
                const classes = isLast ? 'p-2' : 'p-2 border-b border-blue-gray-50';

                return (
                  <tr key={color}>
                    <td className={classes}>
                      <div className="flex flex-row">
                        <div
                          style={{
                            marginTop: '0.2rem',
                            width: '1.5rem',
                            height: '1rem',
                            backgroundColor: colourMap[color].toLowerCase(),
                          }}
                        />

                        <Typography variant="small" color="blue-gray" className="font-normal ml-3">
                          {colourMap[color]} ({color})
                        </Typography>
                      </div>
                    </td>
                    <td className={`${classes}`}>
                      <div className="text-end">
                        <Typography variant="paragraph" color="blue-gray" className="font-normal">
                          {count} <FontAwesomeIcon icon={faCubes} />{' '}
                        </Typography>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </AccordionBody>
      </Accordion>
    </Card>
  );
};

export default UserBlockSummary;
