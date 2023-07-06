import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCubes,
  faDroplet,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { fetchSetById } from '@/api';
import { BuildSetSummary, User } from '@/types';
import { Card, CardHeader, CardBody, Typography, Button } from '@/materialui';
import { BUILDSET_AVATAR_URL } from '@/utils/constants';
import { canUserBuildSet } from '@/utils/users';

export interface UserBuildSetEvaluationProps {
  user: User;
  buildSet: BuildSetSummary;
}

const UserBuildSetEvaluation = async ({
  user,
  buildSet,
}: UserBuildSetEvaluationProps) => {
  const { id: setId, setNumber, name, totalPieces } = buildSet;
  const fullSet = await fetchSetById(setId);

  const { hasAllPieces, missingPieces } = canUserBuildSet(user, fullSet);

  return (
    <Card shadow={true} className="max-w-[39rem] px-3 m-2">
      <CardHeader
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-2"
      >
        <img
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
            <div className="flex flex-col w-2/3 justify-start">
              <Typography color="blue-gray">{setNumber}</Typography>
            </div>

            <div className="flex flex-col w-1/3 items-end pr-3">
              <div className="flex flex-row">
                <Typography variant="h6" color="blue-gray">
                  {' '}
                  {` ${totalPieces}`}{' '}
                  <FontAwesomeIcon
                    icon={faCubes}
                    color={hasAllPieces ? 'green' : 'red'}
                  />{' '}
                </Typography>
                {!hasAllPieces && (
                  <Typography className="ml-2" variant="h6" color="red">
                    {' '}
                    -
                    {missingPieces?.reduce((sum, piece) => {
                      return sum + piece.quantity;
                    }, 0)}{' '}
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
            <Button
              size="sm"
              color="green"
              disabled
              className="flex items-center gap-3"
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="h-5 w-5"
                strokeWidth={2}
              />
              Build it
            </Button>
          )}
          {!hasAllPieces && (
            <>
              <Button
                size="sm"
                color="red"
                className="flex items-center gap-3 ml-2"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="h-5 w-5"
                  strokeWidth={2}
                />
                Missing
              </Button>
              <Button
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
              </Button>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default UserBuildSetEvaluation;
