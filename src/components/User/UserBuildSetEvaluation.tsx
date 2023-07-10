import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faDroplet, faEye, faCheck } from '@fortawesome/free-solid-svg-icons';

import { BuildSet, User } from '@/types';
import { Card, CardHeader, CardBody, Typography, Button } from '@/materialui';
import { BUILDSET_AVATAR_URL } from '@/utils/constants';
import { UserOwnsAllPiecesResult } from '@/utils/users';
import { totalMissingPiecesReducer as reducer } from '@/utils/block';

export interface UserBuildSetEvaluationProps {
  user: User;
  buildSet: BuildSet;
  evaluation: UserOwnsAllPiecesResult;
}

const UserBuildSetEvaluation = async ({
  user,
  buildSet,
  evaluation,
}: UserBuildSetEvaluationProps) => {
  const { id: setId, setNumber, name, totalPieces } = buildSet;
  const { hasAllPieces, missingPieces } = evaluation;

  return (
    <Card shadow={true} className="max-w-[39rem] px-3 m-2">
      <CardHeader floated={false} shadow={false} className="mx-0 flex items-center gap-4 pt-0 pb-2">
        <Image
          width={50}
          height={50}
          alt="build set"
          className="h-[6rem] w-1/4 object-cover object-center"
          src={BUILDSET_AVATAR_URL}
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {name}
            </Typography>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-1/3 justify-start">
              <Typography color="blue-gray">{setNumber}</Typography>
            </div>

            <div className="flex flex-col w-2/3 items-end pr-3">
              <div className="flex flex-row">
                <Typography variant="h6" color="blue-gray">
                  {' '}
                  {` ${totalPieces}`}{' '}
                  <FontAwesomeIcon icon={faCubes} color={hasAllPieces ? 'green' : 'black'} />{' '}
                </Typography>
              </div>
              <div className="flex flex-row items-end">
                {!hasAllPieces && (
                  <Typography className="" variant="h6" color="red">
                    {'missing '}
                    {missingPieces?.reduce(reducer, 0)}{' '}
                    <FontAwesomeIcon icon={faCubes} color="red" />
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mb-2 p-0">
        <div className="flex flex-row justify-end pr-1">
          {hasAllPieces && (
            <Button size="sm" color="green" disabled className="flex items-center gap-3">
              <FontAwesomeIcon icon={faCheck} className="h-5 w-5" strokeWidth={2} />
              Build it
            </Button>
          )}
          {!hasAllPieces && (
            <>
              <Link href={`/users/${user.id}/missing/${setId}`}>
                <Button size="sm" color="amber" className="flex items-center gap-3 ml-2">
                  <FontAwesomeIcon icon={faEye} className="h-5 w-5" strokeWidth={2} />
                  See Details
                </Button>
              </Link>
              {/* <Button
                size="sm"
                disabled
                className="flex items-center gap-3 ml-2"
              >
                <FontAwesomeIcon
                  icon={faDroplet}
                  className="h-5 w-5"
                  strokeWidth={2}
                />
                Sub Color
              </Button> */}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default UserBuildSetEvaluation;
