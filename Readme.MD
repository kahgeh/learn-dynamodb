# Learning objectives

- Learn about dynamodb ( create table via cloudformation, scan, get and put )
- Learn how to expose basic CRUD operations via Api Gateway HttpApi integration 

## Software Outcomes

- PUT /users/{userId} - creates or saves a user

- GET /users/{userId} - queries a user
e.g. response
    {
        id: '007',
        fullName: 'James Bond'
    }

- DELETE /users/{userId} - deletes a user

- GET /users - list all users
e.g. response
    {
        users: [{
                    id: '007',
                    fullName: 'James Bond'
                }]
    }

# Development

## Prerequisite

[awsweb](https://github.com/glassechidna/awsweb) - cli to make credentials available in shell. It uses the credentials in ~/.aws and optionally user-provided or stored MFA credentials.

## Organising Node SAM(AWS Serverles Application Model) Application

Each function is a module. The top level package.json is used to provide overall `npm run build`.

e.g.

    "installMainDeps": "npm ci",
    "validatetemplate": "sam validate --template ./template.yaml --profile <REPLACE ME WITH YOUR AWS PROFILE>",
    "buildUsers": "cd src/users && npm run build && cd ..",
    "buildsam": "sam build",
    "build": "npm run validatetemplate && npm run installMainDeps && npm run buildUsers && npx gulp && npm run buildsam",

## Using SAM cli to deploy to AWS

1. Build - `npm run build`
2. Deploy - for the first time run `sam deploy --guided`, this will save the values you've entered into a `samconfig.toml` such that you can just do `sam deploy` subsequently. 


Three key build tools are used
- `tsc` - transpile typescript to javascript
- `gulp` - copy `package*.json` to dist folder
- `sam build` - create SAM package to be pushed to AWS

# Testing your lambda locally

Run `./scripts/Invoke-Lambda.ps1`