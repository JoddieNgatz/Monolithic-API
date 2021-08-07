# Monolithic-Node-Express-MongoDb-API
Monolithic architecture that performs CRUD operations User sign Up, Sign In on the  data stored in database as well as jwt token generation, verification and regeneration.
Utilizes expressjs, MongoDb for storage, JsonWebToken for authentication, bcrypt for password storage and helmet for security.
 
Disabled X-Powered-By header to detect that the application is powered by Express, which lets hackers conduct a less precise attack

## Project setup
```
npm install
```
## DB setup
```
can run local monogDb Server or cloud mongoDb. Change db url of db.config file in config folder then run. Ensure console log prints Connected to database
```
### Run
```
node server.js
npm run dev
```
### First Step
```
Sign Up user by post: /register {'username':'**', 'email':'**', 'password':'**'}
```
