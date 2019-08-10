
// ========================================Load Internal Modules========================================================

const userDao = require('./userDao');
const userMsg = require('./userConstants').messages
const userMapper = require('./userMapper')
var bcrypt = require('bcryptjs');
const jwtHandler = require('../jwtHandler');
const roles = require('./userConstants').role
// ==========================================End Load Modules=============================================================
function generateSaltAndHashForPassword(password) {
    return bcrypt.hash(password, 10);
}


function verifyPassword(user, isExist) {
    return bcrypt.compare(user, isExist.password);
}


/**for register new users */
function register(req, res) {
    var { emailId, contactNumber, firstName, lastName, password, age, gender } = req.body
    let usrDetails = { emailId, contactNumber, firstName, lastName, password, age, gender }
    return userDao.checkIfExist({ emailId: emailId }).then((exist) => {
        if (exist) {
            return userMapper.bedRequestRes(userMsg.email_exist)
        } else {
            /**user password convert into hashpassword */
            return generateSaltAndHashForPassword(password).then((result) => {
                if (result) {
                    usrDetails.password = result;
                    return userDao.registerUser(usrDetails).then((data) => {
                        return userMapper.registerMapping(userMsg.user_created, data);
                    });
                }
            });
        }
    }).catch((err) => {
        return userMapper.internalServerError()
    })
}

/**for login users,smarty and admin */
function login(loginInfo) {
    return userDao.checkIfExist({ emailId: loginInfo.emailId }).then((isExist) => {
        if (isExist) {
            return verifyPassword(loginInfo.password, isExist).then((valid) => {
                if (valid) {
                    return jwtHandler.genUsrToken({ firstName: isExist.firstName, userId: isExist._id, emailId: isExist.emailId, role: isExist.role }).then((jwt) => {
                        return userMapper.responseMapping(userMsg.login_Successfully, { isExist, jwt: jwt });
                    });
                } else {
                    return userMapper.bedRequestRes(userMsg.password_Mismatch);
                }
            });
        } else {
            return userMapper.dataNotFound(userMsg.users_Not_Found);
        }
    }).catch((err) => {
        return userMapper.internalServerError()
    })
}

/**for get all user list */
function getUserList(req, res) {
    let role = jwtHandler.decodeToken(req).role
    let userId = jwtHandler.decodeToken(req).userId
    if (role == roles.ADMIN) {
        query = { $or: [{ role: roles.ADMIN }, { role: roles.EDITOR }] }
    } else if (role == roles.EDITOR) {
        query = { _id: userId }
    } else {
        return userMapper.dataNotFound(userMsg.users_Not_Found);
    }
    return userDao.getUserList(query).then((result) => {
        if (!result) {
            return userMapper.dataNotFound(userMsg.users_Not_Found);
        }
        return userMapper.responseMapping(userMsg.ok, result)
    }).catch((err) => {
        return userMapper.internalServerError()
    })
}
// ======================================Export Modules=================================================================
module.exports = {
    register,/**for register new user*/

    login,/**for login  */

    getUserList/**for fetch all userlist */


}