
// ===================================Load Internal Modules================================================================================
const userRouter = require("express").Router()
const usrFacade = require('./userFacade')
const validators = require("./userValidators");

//  ====================================Load Modules End======================================================================

// ***************************************for admin pannel*****************************************************************

/**calling facade register function from route */
userRouter.route('/register')
    .post([validators.validateRegister], (req, res) => {
        usrFacade.register(req, res).then((result) => {
            return res.send(result)
        });
    });

/**calling facade login function from route */
userRouter.route('/login')
    .post((req, res) => {
        let { emailId, password } = req.body
        usrFacade.login({ emailId, password }).then((result) => {
            return res.send(result)
        });
    });

/**calling facade getUserList function from route */
userRouter.route('/getUserList')
    .get((req, res) => {
        usrFacade.getUserList(req, res).then((result) => {
            return res.send(result)
        });
    });


// =====================================================EXPORT Module========================================================================  
// EXPORT userRouter  
module.exports = userRouter;