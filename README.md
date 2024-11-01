This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The project uses Node LTS 20.17.0. Use NVM to manage the version. 
Committing to the repo also uses NVM to monitor commit messages:

```bash
nvm install v20.17.0
nvm use
```

will install the correct version.

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run Storybook locally

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the interactive design system.

## Deploy on Vercel

The app is deployed to using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

The `develop` branch is deployed [here](https://wiebecool-git-develop-tom-cools-projects.vercel.app/)

### Steps to merge `develop` into `main` with a tag

1. Ensure you are on the `develop` branch:
```bash
git checkout develop
```

2. Pull the latest changes for develop:
```bash
git pull origin develop
```

3. Switch to the main branch:
```bash
git checkout main
```

4. Pull the latest changes for main:
```bash
git pull origin main
```

5. Merge develop into main:
```bash
git merge develop
```
(Optional) Resolve any merge conflicts if necessary.

6. Create a tag for the release (replace v1.0.0 with the version number or tag you want):
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
```
Also update the version in the `package.json`.

7. Push the main branch and the tag to the remote repository:
```bash
git push origin main
git push origin v1.0.0
```

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
