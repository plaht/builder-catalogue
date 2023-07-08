import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import { BuildSetSummary } from '@/types';
import { Card, CardHeader, CardBody, Typography } from '@/materialui';
import { BUILDSET_AVATAR_URL } from '@/utils/constants';

export interface BuildSetSummaryCardProps {
  buildSet: BuildSetSummary;
}

const BuildSetSummaryCard = ({ buildSet }: BuildSetSummaryCardProps) => {
  const { id, setNumber, name, totalPieces } = buildSet;
  return (
    <Card shadow={true} className="max-w-[39rem] px-3 m-2">
      <CardHeader floated={false} shadow={false} className="mx-0 flex items-center gap-4 pt-0 pb-2">
        <Image
          width={800}
          height={400}
          alt="build set"
          className="h-[6rem] w-full object-cover object-center"
          src={BUILDSET_AVATAR_URL}
        />
      </CardHeader>
      <CardBody className="mb-2 p-0">
        <div className="flex flex-row justify-end pr-3">
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                {name}
              </Typography>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col w-2/3 items-start">
                <Typography color="blue-gray">{`Set: ${setNumber}`}</Typography>
              </div>
              <div className="flex flex-col w-1/3 items-end">
                <Typography variant="h6" color="blue-gray">
                  {' '}
                  {` ${totalPieces}`} <FontAwesomeIcon icon={faCubes} />{' '}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BuildSetSummaryCard;
