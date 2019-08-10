
const status = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
}

const http_code = {
    created: 201,
    ok: 200,
    unAuthorized: 401,
    dataNotFound: 404,
    forbidden: 403,
    badRequest: 400,
    internalServerError: 500
}

const role = {
    ADMIN: 'ADMIN',
    EDITOR: 'EDITOR'
}

const messages = {
    email_Cant_Empty: "EmailId is empty or Invalid.",
    userName_Cant_Empty: "UserName is empty or Invalid",
    pwd_Cant_Empty: "Password is empty or Invalid.",
    user_created: "Register successfully",
    firstName_Cant_Empty: "FirstName is required",
    fullName_Cant_Empty: "fullName is empty or Invalid",
    email_exist: "emailId is Already Existed",
    contactNumber_Cant_Empty: "ContactNumber is empty or Invalid",
    InternalServerError: "Internal server error",
    users_Not_Found: "User not found",
    unAuthAccess: "UnAuthorization Access",
    password_Mismatch: "Password Mismatch",
    login_Successfully: "Login Successfully",
    ok: "ok"
}

module.exports = {
    status,

    http_code,

    messages,

    role
}