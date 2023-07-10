import React from 'react';

import { BuildSetSummary, BuildSet, User } from '@/types';
import { Typography } from '@/materialui';
import { fetchSetById, fetchSets } from '@/api';
import { canUserBuildSet } from '@/utils/users';
import { totalMissingPiecesReducer as reducer } from '@/utils/block';
import UserBuildSetEvaluation from './UserBuildSetEvaluation';

const UserBuildSets = async ({ user }: { user: User }) => {
  const setSummaries = await fetchSets();
  const sets = await Promise.all(
    setSummaries.Sets.map(async (set: BuildSetSummary) => {
      const fullSet = await fetchSetById(set.id);
      return fullSet;
    })
  );

  const evaluatedSets = sets.map((set: BuildSet) => {
    const evaluation = canUserBuildSet(user, set);
    return {
      buildSet: set,
      evaluation,
      totalMissingPieces: evaluation.missingPieces.reduce(reducer, 0),
    };
  });

  const sortedEvaluatedSets = evaluatedSets.sort((a, b) => {
    if (a.evaluation.hasAllPieces && b.evaluation.hasAllPieces) {
      return b.buildSet.totalPieces - a.buildSet.totalPieces;
    }
    if (a.evaluation.hasAllPieces && !b.evaluation.hasAllPieces) {
      return -1;
    }
    if (!a.evaluation.hasAllPieces && b.evaluation.hasAllPieces) {
      return 1;
    }
    return a.totalMissingPieces - b.totalMissingPieces;
  });

  return (
    <>
      <Typography variant="h3" color="blue-gray" className="ml-2 -mb-1">
        Build sets
      </Typography>
      {sortedEvaluatedSets.map((evaluatedSet) => {
        const { totalMissingPieces, ...rest } = evaluatedSet;
        return <UserBuildSetEvaluation key={evaluatedSet.buildSet.id} user={user} {...rest} />;
      })}
    </>
  );
};

export default UserBuildSets;
