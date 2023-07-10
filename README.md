# Builder Catalogue

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

It utilizes [Material Tailwind](https://www.material-tailwind.com) and tries to pair users block collections with buildsets using the some of the latest features of nextjs.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

  - Users have an overview of their brick collection and can see what buildsets they can complete, what sets they can not and how many bricks they are missing

  - Users can see details about what bricks they are missing, and who they might collaborate with to build a set

  - Users can build a custom set and select a coverage amount (default 50%). This coverage amount will tell the largest set of bricks a user can create a set with so that the coverage amount can build the custom set.

  - User can write a message collaborate with another user

## Todo

- [ ] Add translation support using react-i18next
- [ ] Handle various errors - api errors, Add error boundary. Better error pages.
- [ ] Improve loading experience - Suspense animations / skeletons
- [ ] Improve Client side rehydration - useSWR for better fetching
- [ ] Refactor folder structure
- [ ] Integation tests - testing the UI. Playwright
- [ ] Color substitution suggestion if user can not complete a set as specified with another unused color
