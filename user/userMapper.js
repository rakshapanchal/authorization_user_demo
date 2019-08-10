//========================== Load Modules Start ====================================

const userCode = require('./userConstants').http_code
const userMsg = require('./userConstants').messages

//========================== Load Modules End ==============================================

/** for Update,Delete,Ok Response
 * 
 * @param {string} message response message
 * @param {object} data  response data
 */
function responseMapping(message, data) {
    var responseObj = {
        "responseCode": userCode.ok,
        "responseMessage": message,
        "responseData": data
    }
    return responseObj;
}

/** for created user Response
 * 
 * @param {string} message response message
 * @param {object} data  response data
 */
function registerMapping(message, data) {
    var responseObj = {
        "responseCode": userCode.created,
        "responseMessage": message,
        "responseData": data
    }
    return responseObj;
}


/** for internal error */
function internalServerError() {
    var responseObj = {
        "responseCode": userCode.internalServerError,
        "responseMessage": userMsg.InternalServerError
    }
    return responseObj;
}

/**Bed Request Response
 * 
 * @param {*string} message response message
 */
function bedRequestRes(message) {
    var responseObj = {
        "responseCode": userCode.badRequest,
        "responseMessage": message,
    }
    return responseObj;
}

/**Data Not Found response */
function dataNotFound(message) {
    var responseObj = {
        "responseCode": userCode.dataNotFound,
        "responseMessage": message
    }
    return responseObj;
}

/**for unAuthorized access
 * 
 * @param {*string} message response message
 */
function unAuthorized(message) {
    var responseObj = {
        "responseCode": userCode.unAuthorized,
        "responseMessage": message,
    }
    return responseObj;
}

//========================== Export Module Start ==============================

module.exports = {
    responseMapping,/** for update,delete,ok response*/

    registerMapping,/** for created user Response*/

    bedRequestRes,/**Bed Request Response**/

    dataNotFound,/**Data Not Found response */

    internalServerError,/**for Internal server error */

    unAuthorized/**for unAuthorized access*/
};

//========================== Export Module End ===============================