# Tanzania Mesh Hernia Registry
Tanzania Mesh Hernia Registry, is a mobile-first website and database designed to record and track Mesh Hernia operations in Tanzania. It was built by and for the SWIFTSS charity who are focused on improving the availability and effectiveness of mesh hernia surgery across Tanzania.


# Set up Client

### Pre-required

- [Node v12+](https://orfium.atlassian.net/wiki/spaces/ENG/pages/877101095)
- [Yarn](https://yarnpkg.com/)
- [Git installed](https://git-scm.com/)
- [Github Account and private access on Orfium](https://orfium.atlassian.net/wiki/spaces/ENG/pages/864190801/ORFIUM+Libraries)

### How to install

Clone the project on your personal local machine and then

`yarn install`

You can run the app in development mode. Open [http://localhost:3000](http://localhost:3000/) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

`yarn start`

> __Note:__ If you are using Node v17+ you may get `error:03000086:digital envelope routines::initialization error` error when running `yarn start`. If so please follow the instructions on https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported to resolve. 

You can run the test runner in the interactive watch mode.

`yarn test`

### Running against a local instance of the registry-api
You can run against a different registry-api backend by changing  `BASE_URL` in `src/api/axiosInstances.ts`. For example to run against a local development instance this should be set to:
~~~
const BASE_URL = 'http://localhost:8000/api';
~~~
