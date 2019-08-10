
// load all dependencies
var Promise = require("bluebird");
var jwt = Promise.promisifyAll(require("jsonwebtoken"));
var role = require('./user/userConstants').role
var userMapper = require('./user/userMapper')
var userMsg = require('./user/userConstants').messages


/**for generate user and admin Token */
var genUsrToken = function (user) {
    if (user.role == role.ADMIN) {
        secretKey = process.env.admin_secret
    } else if (user.role == role.EDITOR) {
        secretKey = process.env.user_secret
    }
    var options = { expiresIn: '24hr' };
    return jwt.signAsync(user, secretKey, options)
        .then((jwtToken) => {
            return jwtToken;
        }).catch(function (err) {
            throw err;
        });
};

/**for verify User Token */
var verifyUsrToken = function (req, res, next) {
    let token = req.headers['authorization']
    return jwt.verifyAsync(token, process.env.user_secret)
        .then((jwtToken) => {
            next();
        }).catch(function (err) {
            return res.send(userMapper.unAuthorized(userMsg.unAuthAccess))
        });
}


/**for verify Admin Token */
var verifyAdminToken = function (req, res, next) {
    let token = req.headers['authorization']
    return jwt.verifyAsync(token, process.env.admin_secret)
        .then((jwtToken) => {
            next();
        }).catch(function (err) {
            return resHndlr.sendSuccess(res, userMapper.unAuthorized(userMsg.unAuthAccess))
        });
}

/**for decode token */
var decodeToken = function (req) {
    let token = req.headers['authorization']
    return jwt.decode(token)
}

// ============================================export Modules===============================================================

module.exports = {
    genUsrToken, /**for generate user and admin Token */

    verifyUsrToken,/**for verify User Token */

    verifyAdminToken,/**for verify Admin Token */

    decodeToken,/**for decode token */

};



