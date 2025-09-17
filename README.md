# Terraloom CMS Webapp
This is a CMS frontend (webapp) for my miniature e-commerce project Terraloom. Used for : 
- Category management
- Product management
- CMS User management
- Account management
- Transaction monitoring
- Export report

## Specification

The application is written in Typescript. With specification : 
- Node (ver 22+)
- NPM (ver 10+)
- Tailwind CSS (version 4+)
- React Flowbite (version 12+)

## Prepare the CMS API

You should make sure that CMS API is running , before run the CMS webapp. you can find the back end here : 
> https://github.com/jhasudungan/terraloom-cms-api

## Prepare Minio object storage
You need to have minio object storage installed , you can follow this instuction to install minio as a standalone 
> https://docs.min.io/community/minio-object-store/operations/deployments/baremetal-deploy-minio-server.html

and as docker container :
> https://hub.docker.com/r/minio/minio

## Run in local
- Make sure minio object storage running
- Make sure you had Node, NPM and GIT available in you machine
```shell
# Check Node
node --version

# Check NPM
npm --version
```
- Pull this repository 
```shell
git pull {thisrepository}
```
- Create the .env in the root of the project
```shell
API_CMS_HOST=
DEFAULT_PER_PAGE=5

MINIO_ENDPOINT=
MINIO_PORT=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_USE_SSL=false

CMS_JWT_SECRET=
```
- **API_CMS_HOST** is a host for CMS API
- **MINIO_ENDPOINT** is host for minio
- **MINIO_ACCESS_KEY** and **MINIO_ACCESS_KEY** is credential for minio, setup when minio being installed
- **CMS_JWT_SECRET** is a JWT secret shared between CMS API and CMS webapp
- You can run in dev mode : 
```shell
npm run dev
```
- You can build and start : 
```shell
npm run build
npm run start
```
- The application will run on port 3005