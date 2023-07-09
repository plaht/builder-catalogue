'use client';

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

import { BuildSet, BlockPiece, ColourLibrary } from '@/types';
import { BUILDSET_AVATAR_URL } from '@/utils/constants';
import { Card, CardHeader, CardBody, Typography, Input } from '@/materialui';
import BlockRowList from './BlockRowList';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import { data } from 'autoprefixer';

const BuildSetDetails = ({
  buildSet,
  missingPieces = [],
  colourLibrary,
}: {
  colourLibrary: ColourLibrary;
  buildSet: BuildSet;
  missingPieces?: BlockPiece[];
}) => {
  const { setNumber, name, totalPieces, pieces } = buildSet;

  const hasMissingPieces = missingPieces.length > 0;

  const fullSet = <BlockRowList piecesToList={pieces} colourLibrary={colourLibrary} />;
  const missingSet = (
    <BlockRowList piecesToList={missingPieces} hasMissingPieces colourLibrary={colourLibrary} />
  );

  return (
    <Card shadow={true} className="max-w-[39rem] px-3 mx-2 my-1">
      <CardHeader floated={false} shadow={false} className="mx-0 flex items-center gap-4 pt-0 pb-2">
        <Image
          width={50}
          height={50}
          alt={`build set ${setNumber}`}
          className="h-[6rem] w-1/4 object-cover object-center"
          src={BUILDSET_AVATAR_URL}
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            {name ? (
              <>
                <Typography variant="h5" color="blue-gray">
                  {`${name} `}
                </Typography>
              </>
            ) : (
              <Input label={'Build set name?'} disabled />
            )}
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-1/3 justify-start">
              <Typography color="blue-gray">{setNumber}</Typography>
            </div>

            <div className="flex flex-col w-2/3 items-end pr-3">
              <div className="flex flex-row">
                <Typography variant="h6" color="blue-gray">
                  {' '}
                  {` ${totalPieces}`} <FontAwesomeIcon icon={faCubes} color="blue-gray" />{' '}
                </Typography>
              </div>
              <div className="flex flex-row items-end">
                {hasMissingPieces && (
                  <Typography className="" variant="h6" color="red">
                    {'missing '}
                    {missingPieces?.reduce((sum, piece) => {
                      return sum + piece.quantity;
                    }, 0)}{' '}
                    <FontAwesomeIcon icon={faCubes} color="red" />
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-1 py-2">
        {hasMissingPieces ? (
          <Tabs value="missing">
            <TabsHeader>
              <Tab key={'missing'} value={'missing'}>
                {'Missing pieces'}
              </Tab>
              <Tab key={'full'} value={'full'}>
                {'Full set'}
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel key={'missing'} value={'missing'}>
                {missingSet}
              </TabPanel>
              <TabPanel key={'full'} value={'full'}>
                {fullSet}
              </TabPanel>
            </TabsBody>
          </Tabs>
        ) : (
          <>{fullSet}</>
        )}
      </CardBody>
    </Card>
  );
};

export default BuildSetDetails;
