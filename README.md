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

## Setup Overview

This project leverages **Husky** and **semantic-release** to enhance our development workflow, maintain code quality, and automate version management.

### Husky

**Husky** is a Git hooks manager that helps enforce code quality and best practices in our development process. By integrating Husky, we can run specific scripts at different stages of the Git lifecycle. In this project, Husky is configured to run tests before each commit to ensure that only code that passes all tests is committed. This helps prevent introducing bugs into the codebase.

### Semantic Versioning

We follow **Semantic Versioning (SemVer)**, a versioning scheme that reflects the nature of changes in the software. According to SemVer, version numbers take the form of `MAJOR.MINOR.PATCH`. Changes in the MAJOR version indicate breaking changes, MINOR version changes are for backward-compatible functionality, and PATCH version changes are for backward-compatible bug fixes. For more details, refer to the [Semantic Versioning Specification](https://semver.org/).

### Running Tests on Pre-Commit

With Husky set up, the command `npm test` is automatically executed on every pre-commit hook. This ensures that any failing tests will prevent the commit from proceeding, thus helping maintain a stable and functional codebase.

### Automatic Tag Creation

**semantic-release** automates the versioning and package publishing process based on commit messages. When changes are pushed to the repository, semantic-release analyzes the commit history to determine the next version number according to Semantic Versioning rules. Importantly, **tag creation is handled by semantic-release by default**, which creates a Git tag for each new version. This allows for easy tracking of releases and facilitates the deployment process.

For more information on how to configure and use semantic-release, please refer to the [semantic-release documentation](https://semantic-release.gitbook.io/semantic-release/).


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
