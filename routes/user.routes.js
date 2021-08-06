const controller = require("../controllers/SignInUp.Controller");
const middleware =require('../middleware/verify')
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
/**
 * @api {post} /register Register
 * @apiGroup SignInUp
 * @apiParam {String} title Task title
 * @apiParamExample {json} Input
 *    {
 *      "username": "joe"
 *      "email": "doe@gmail.com"
 *      "password": "1*2£456^*"
 *    }
 * @apiSuccess {String} username
 * @apiSuccess {String} email
 * @apiSuccess {String} password
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      message: "registered"
 *      "username": "joe"
 *      "email": "doe@gmail.com"
 *      "password": "1*2£456^*"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
    //app.post('/register', [middleware.checkDuplicateUserOnSignUp], controllerMiddleware.register);
    // app.post('/register', [middleware.checkDuplicateUserOnSignUp],
    //   controller.register);
      app.post('/register', controller.register);
  
  
    
/**
 * @api {post} /signIn signIn
 * @apiGroup SignInUp
 * @apiParam {String} SignIn
 * @apiParamExample {json} Input
 *    {
 *      "username": "joe"
 *      "password": "1*2£456^*"
 *    }
 * @apiSuccess {String} username
 * @apiSuccess {String} password
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      message: "signed In"
 *      "username": "joe"
 *      "password": "1*2£456^*"
 *    }
 * @apiErrorExample {json} SignIn error
 *    HTTP/1.1 500 Internal Server Error
 */
  app.post('/signIn', controller.signIn);


     
/**
 * @api {get} /signIn signIn
 * @apiGroup SignInUp
 * @apiParam {String} SignIn
 * @apiParamExample {json} Input
 *    {
 *      "username": "joe"
 *      "password": "1*2£456^*"
 *      "accesToken": "*****"
 *    }
 * @apiSuccess {String} username
 * @apiSuccess {String} password
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      message: "signed In"
 *      "username": "joe"
 *      "password": "1*2£456^*"
 *       "accesToken":"token"
 *    }
 * @apiErrorExample {json} SignIn error
 *    HTTP/1.1 500 Internal Server Error
 */
 app.get('/signIn', [middleware.authToken],controller.signIn);
}