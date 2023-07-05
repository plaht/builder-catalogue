import React from 'react';

import { BuildSetSummary } from '@/types';
import BuildSetSummaryCard from '@/components/BuildSetSummary';
import { Card, CardHeader, CardBody, Typography } from '@/materialui';

export interface BuildSetListProps {
  sets: BuildSetSummary[];
}

const BuildSetList = ({ sets }: BuildSetListProps) => {
  return (
    <div className="flex flex-col px-8">
      <Card className="w-full max-w-[39rem] px-3 m-2 bg-red-400">
        <CardHeader
          floated={false}
          shadow={false}
          className="mx-8 flex items-center gap-4 pt-0 pb-2 bg-inherit"
        >
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h2" color="blue-gray">
                Sets
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-2 overflow-hidden">
          {sets.map((set: BuildSetSummary) => (
            <BuildSetSummaryCard key={set.id} buildSet={set} />
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default BuildSetList;
