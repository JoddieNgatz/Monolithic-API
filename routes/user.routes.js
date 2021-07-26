const { verify } = require('../middleware/verify');
const controllerMiddleware = require("../controllers/SignInUp.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
    });
    
    app.post('/register', [verify.checkDuplicateUserOnSignUp], controllerMiddleware.register);

    app.post('/signIn', controllerMiddleware.signIn);
}