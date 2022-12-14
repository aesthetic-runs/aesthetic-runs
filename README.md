# Aesthetic Runs

Runs that are easy on the eyes.

Link to website:

aesthetic-runs.netlify.app/

*Please allow some time when signing up or loging in

## Start development

### Run front end on local machine

- `cd front-end`
- `nvm use lts/hydrogen`
- `npm install`
- Add Google Maps API key using `dotenv` to `front-end/src/components/MapDisplay`
- `npm start`

### Run back end on local machine

- Ensure you are in the root folder
- `nvm use lts/hydrogen`
- `npm install`
- Add MongoDB access key using `dotenv` to `/db/dbConnect.js`
- `npx nodemon index.js`
