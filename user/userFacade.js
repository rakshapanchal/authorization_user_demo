// ========================================Load Internal Modules========================================================

const userService = require('./userService')

// ==========================================End Load Modules=============================================================


/**calling service  register function from facade  */
function register(req, res) {
    return userService.register(req, res)
        .then((result) => {
            return result;
        })
}

/**calling service  login function from facade  */
function login(loginInfo) {
    return userService.login(loginInfo)
        .then((result) => {
            return result;
        })
}

/**calling service  getUserList function from facade  */
function getUserList(req, res) {
    return userService.getUserList(req, res)
        .then((result) => {
            return result;
        })
}
// ======================================Export Modules=================================================================

module.exports = {
    register,/**calling service register function from facade */

    login,/**calling service login finction from facade */

    getUserList,/**calling service  getUserList function from facade  */

}