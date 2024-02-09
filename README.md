This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The project uses Node 18.17.0:

```bash
nvm use
```

will install the correct version.

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The app is deployed to using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

The `develop` branch is deployed [here](https://wiebecool-git-develop-tom-cools-projects.vercel.app/)

## Environment variables

We use environment variables to hide access keys for Contentful and Resend (and more).
For local development you have to create a `env.local` file in the root to host those keys.

The same keys are set within the Environment Variables for Vercel deployments.

To be able to run Cypress e2e tests, e.g. the access keys for Contenful are also set in the Github Repository.

This means, that if 1 key changes, it has to be updated in these locations:

1. The `env.local` file
2. Vercels' Environment variabels
3. Github Repository Secrets

## Cypress e2e Testing

### Locally

-   Run either `npm run e2e` to start Cypress in a GUI and manually run tests on `http://localhost:3000`
-   Or run `npm run e2e:headless` to run all tests in the background using `http://localhost:3000`

### CI

-   A CI is setup through a Github Action that runs Cypress e2e test on evey push, except the `main` branch
