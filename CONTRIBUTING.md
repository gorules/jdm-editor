# Contributing to JDM Editor

Want to contribute to JDM Editor? There are a few things you need to know.

## Install

This repository use yarn package manager, to install the dependencies run:

`yarn`

## Storybook

A storybook is available to check your changes.
To dev with Storybook run:

`yarn storybook`

## Build

To check the package output run:

`yarn build`

## Tests

To check tests run:

`yarn test`

Add tests to cover new code and be sure that coverage didn't decrease with:

`yarn test:coverage`

## Lint

To check if your code don't have any lint or prettier problem run:

`yarn format`

To fix problems run:

`yarn format:fix`

## Git commits

This repository use [Commitizen](https://github.com/commitizen/cz-cli).
When you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time.

You need to run `git cz` and you'll be prompted to fill in any required fields, and your commit messages will be formatted according to the standards defined by react-js-cron.
