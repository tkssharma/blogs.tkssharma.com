---
date: 2023-03-20
title: 'How to lint messages with CommitLint and Husky'
template: post
featuredImage: '../thumbnails/js.png'
thumbnail: '../thumbnails/js.png'
slug: how-to-lint-messages-with-commitLint-and-husky
categories:
  - nodejs
  - aws
  - react
  - microservices
tags:
  - nodejs
  - aws
  - react
  - microservices
---

How to lint messages with CommitLint and Husky
=================================

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*TOGgNgGSIgZ2CxhL.jpg)


What is Husky
------------

Husky is a tool that allows you to easily add Git hooks to your project. Git hooks are scripts that are executed at certain points in the Git workflow, such as before a commit, after a commit, before a push, etc. Husky simplifies the process of setting up and managing these hooks.

With Husky, you can automate various tasks or enforce certain rules and checks before allowing a commit or a push. This can include running tests, linting code, formatting files, validating commit messages, and more.

what is CommitLint
------------------

CommitLint is a tool that helps enforce consistent and well-formed commit messages in a Git repository. It checks the commit messages against a set of predefined rules or guidelines to ensure that they follow a consistent format.

CommitLint uses a configuration file to define the rules for commit message validation. This configuration file specifies the pattern or format that commit messages should adhere to, as well as any additional rules or requirements.

The most commonly used configuration for CommitLint is the conventional commit format, which promotes a standardized format for commit messages. This format typically consists of a structured message that includes a type, an optional scope, and a subject. For example: feat(user): add login functionality.


Lets make Commitlint and Husky Together 
=======================================


```SH
# Step 1. Install commitlint dependency
npm install --save-dev @commitlint/cli
# Step 2. Install conventional commit config
npm install --save-dev @commitlint/config-conventional
# Step 3. Configure commitlint to use conventional commits
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
# Step 4. Install Husky (v7)
npm install --save-dev husky 
# Step 5. Enable Husky
# (NOTE: this will also add a "npm test" pre-commit hook)
npx husky-init && npm install
# Step 5.1 (Optionally) Delete the pre-commit hook
rm .husky/pre-commit
# Step 6. Add commitlint commit-msg hook 
cat <<EEE > .husky/commit-msg #!/bin/sh . "\$(dirname "\$0")/_/husky.sh"  npx --no -- commitlint --edit "\${1}" EEE
```

lets install Husky 

```sh
npm install --save husky
```

we can run prepare script for Husky 
```json
  "scripts": {
    "lint": "node node_modules/prettier/bin-prettier --check \"**/*.{js,json,ts,yml,yaml}\"",
    "prepare": "husky install",
    "prettier": "node node_modules/prettier/bin-prettier --check '**/*.{js,json,ts,yml,yaml}'",
    "prettier:write": "node node_modules/prettier/bin-prettier --write \"**/*.{js,json,ts,yml,yaml}\""
  },
```

Lets add all required dependencies for Commitlint 
```json
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "prepare": "husky install",
    "prettier": "node node_modules/prettier/bin-prettier --check '**/*.{js,json,ts,yml,yaml}'",
    "prettier:write": "node node_modules/prettier/bin-prettier --write \"**/*.{js,json,ts,yml,yaml}\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@commitlint/cli": "^17.6.3",
    "@commitlint/config-conventional": "^16.0.0",
    "commitizen": "^4.2.4",
    "conventional-changelog-cli": "^2.2.2",
    "cz-conventional-changelog": "^3.3.0",
    "husky": "^7.0.4",
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}

```
create a commitlint config file commitlint.config.js

```js
module.exports = { extends: ["@commitlint/config-conventional"] };
```

Lets create .husky configurations with prepare script from package json script 

```sh
npm run prepare 
```
prepare will create .husky.sh in .husky folder _

```sh
#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  export readonly husky_skip_init=1
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  exit $exitCode
fi

```
and finally create commit msg Husky Hook 

commit-msg
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```
pre-commit 
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

if [ "$NO_VERIFY_YOLO" ]; then exit 0; fi
npm run lint && npm run prettier
```

prepare-commit-msg
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

if [ "$NO_VERIFY" ] || [ "$NO_VERIFY_YOLO" ]; then exit 0; fi
exec < /dev/tty && node_modules/.bin/cz --hook || true

```

Now our setup is ready, we can test it 

```sh
➜  express-apis-monorepo git:(develop) ✗ npm run prettier:write

> express-apis-app@1.0.0 prettier:write
> node node_modules/prettier/bin-prettier --write "**/*.{js,json,ts,yml,yaml}"

commitlint.config.js 30ms
jest.config.js 7ms
pnpm-lock.yaml 665ms
pnpm-workspace.yaml 24ms
➜  express-apis-monorepo git:(develop) ✗ 

```


```sh
➜  express-apis-monorepo git:(develop) ✗ git commit -m ""

> express-apis-app@1.0.0 lint
> node node_modules/prettier/bin-prettier --check "**/*.{js,json,ts,yml,yaml}"

Checking formatting...
All matched files use Prettier code style!

> express-apis-app@1.0.0 prettier
> node node_modules/prettier/bin-prettier --check '**/*.{js,json,ts,yml,yaml}'

Checking formatting...
All matched files use Prettier code style!
cz-cli@4.2.4, cz-conventional-changelog@3.3.0

? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature 
  fix:      A bug fix 
  docs:     Documentation only changes 
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 
  refactor: A code change that neither fixes a bug nor adds a feature 
  perf:     A code change that improves performance 
  test:     Adding missing tests or correcting existing tests 
(Move up and down to reveal more choices)

```
