const comparisonCounts = {
  '3029-4': [
    {
      count: 0,
      username: 'brickfan35',
      userId: '6d6bc9f2-a762-4a30-8d9a-52cf8d8373fc',
    },
    {
      count: 1,
      username: 'underground-bricks',
      userId: 'b9ccfd73-c222-4e34-a252-1fc3222bbd2f',
    },
    {
      count: 2,
      username: 'green-bricks-only',
      userId: '506ad852-3e42-497e-a14d-99934d4df2e2',
    },
    {
      count: 6,
      username: 'dr_crocodile',
      userId: 'b56c4819-b6b5-422c-a023-5fdffbdf01f2',
    },
    {
      count: 6,
      username: 'landscape-artist',
      userId: '220053f6-8a3a-45b1-8291-a59845c2b1df',
    },
    {
      count: 6,
      username: 'wizard13',
      userId: '7c95658e-05dd-4563-867b-095d5a1edeb5',
    },
    {
      count: 8,
      username: 'spaceman77',
      userId: '2d33d4b3-70a1-4106-ad6c-5028dadc6251',
    },
    {
      count: 9,
      username: 'arts-n-bricks',
      userId: '353555ef-3135-4d3a-8e39-c680e1eb26d2',
    },
    {
      count: 11,
      username: 'megabuilder99',
      userId: 'd174c807-8880-4f49-866b-6e1ec6527ccf',
    },
    {
      count: 13,
      username: 'technical-spike',
      userId: '17053e30-1cfa-4c34-9f37-b541bfc6b316',
    },
    {
      count: 18,
      username: 'captain-pieces',
      userId: '2f10aad6-670e-4b3b-be7f-6a4ab57f232a',
    },
  ],
  '3029-2': [
    {
      count: 0,
      username: 'spaceman77',
      userId: '2d33d4b3-70a1-4106-ad6c-5028dadc6251',
    },
    {
      count: 2,
      username: 'landscape-artist',
      userId: '220053f6-8a3a-45b1-8291-a59845c2b1df',
    },
    {
      count: 3,
      username: 'arts-n-bricks',
      userId: '353555ef-3135-4d3a-8e39-c680e1eb26d2',
    },
    {
      count: 3,
      username: 'wizard13',
      userId: '7c95658e-05dd-4563-867b-095d5a1edeb5',
    },
    {
      count: 4,
      username: 'technical-spike',
      userId: '17053e30-1cfa-4c34-9f37-b541bfc6b316',
    },
    {
      count: 7,
      username: 'megabuilder99',
      userId: 'd174c807-8880-4f49-866b-6e1ec6527ccf',
    },
    {
      count: 9,
      username: 'brickfan35',
      userId: '6d6bc9f2-a762-4a30-8d9a-52cf8d8373fc',
    },
    {
      count: 9,
      username: 'dr_crocodile',
      userId: 'b56c4819-b6b5-422c-a023-5fdffbdf01f2',
    },
    {
      count: 11,
      username: 'green-bricks-only',
      userId: '506ad852-3e42-497e-a14d-99934d4df2e2',
    },
    {
      count: 13,
      username: 'underground-bricks',
      userId: 'b9ccfd73-c222-4e34-a252-1fc3222bbd2f',
    },
    {
      count: 15,
      username: 'captain-pieces',
      userId: '2f10aad6-670e-4b3b-be7f-6a4ab57f232a',
    },
  ],
};

const user = {
  id: '41',
  username: 'megabuilder99',
  location: 'CPH',
  brickCount: 21,
  collection: [{
    pieceId: '3029',
    variants: [
      { color: '4', count: 3 },
      { color: '1', count: 1 },
    ]
  },
  {
    pieceId: '5092',
    variants: [
      { color: '4', count: 4 },
      { color: '1', count: 9 },
    ]
  },
]
};

const otherUsers = [
  {
    id: '41',
    username: 'waffle_horse',
    location: 'BNE',
    brickCount: 33,
    collection: [{
      pieceId: '3029',
      variants: [
        { color: '2', count: 9 },
        { color: '1', count: 1 },
      ]
    },
    {
      pieceId: '5091',
      variants: [
        { color: '4', count: 3 },
        { color: '12', count: 12 },
      ]
    },
    {
      pieceId: '9502',
      variants: [
        { color: '1', count: 8 },
      ]
    },
  ]
  },
  {
    id: '4005',
    username: 'superkit',
    location: 'AAL',
    brickCount: 16,
    collection: [{
      pieceId: '3029',
      variants: [
        { color: '4', count: 6 },
        { color: '1', count: 1 },
      ]
    },
    {
      pieceId: '5092',
      variants: [
        { color: '4', count: 3 },
        { color: '2', count: 4 },
      ]
    },
    {
      pieceId: '9014',
      variants: [
        { color: '9', count: 2 },
      ]
    },
  ]
  }
]

export { comparisonCounts, user, otherUsers };