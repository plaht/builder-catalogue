'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

import { BuildSet, BlockPiece } from '@/types';
import { BUILDSET_AVATAR_URL } from '@/utils/constants';
import {
  Card,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@/materialui';
import BlockRow from './BlockRow';

const BuildSetDetails = ({
  buildSet,
  missingPieces,
}: {
  buildSet: BuildSet;
  missingPieces: BlockPiece[];
}) => {
  const { setNumber, name, totalPieces } = buildSet;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Card shadow={true} className="max-w-[39rem] px-3 mx-2 my-1">
      <Accordion open={open}>
        <AccordionHeader onClick={() => handleOpen()}>
          <div className="flex flex-row w-full">
            <Image
              src={BUILDSET_AVATAR_URL}
              height={30}
              width={30}
              style={{ objectFit: 'contain' }}
              alt={`build set ${setNumber}`}
            />
            <div className="flex w-full flex-row gap-0.5">
              <div className="flex ml-4  w-2/3 items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {`${name} `}
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  {`Set Number:`} ({setNumber})
                </Typography>
              </div>
              <div className="flex w-1/3 justify-end">
                <Typography variant="h6" color="blue-gray">
                  {' '}
                  {totalPieces} <FontAwesomeIcon icon={faCubes} />{' '}
                </Typography>
              </div>
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <table className="w-full min-w-max table-auto text-left">
            <tbody>
              {missingPieces.map((missingPiece, index) => {
                const isLast = index === missingPieces.length - 1;
                const classes = isLast
                  ? 'p-2'
                  : 'p-2 border-b border-blue-gray-50';

                return <BlockRow classes={classes} blockPiece={missingPiece} />;
              })}
            </tbody>
          </table>
        </AccordionBody>
      </Accordion>
    </Card>
  );
};

export default BuildSetDetails;
