'use strict';

//========================== Load Modules Start =======================
let BaseDao = require('../dao/baseDao');
const User = require('./userModel')
const userDao = new BaseDao(User);
//========================== Load Modules End ==============================================


/**for signUp Users
 * 
 * @param {object} userInfo signUp Details
 */
function registerUser(userInfo) {
    let user = new User(userInfo);
    return userDao.save(user).then((result) => {
        return result;
    })
}

/**for check emailId is exist or not
 * 
 */
function checkIfExist(query) {
    return userDao.findOne(query).then((result) => {
        return result;
    })
}

/**for fetch all userList */
function getUserList(query) {
    return userDao.find(query).then((result) => {
        return result;
    })
}

//========================== Export Module Start ==============================

module.exports = {
    registerUser,/**for signUp Users*/

    checkIfExist,/**for check user is register or not*/

    getUserList/**for fetch all userList */


};

//========================== Export Module End ===============================
