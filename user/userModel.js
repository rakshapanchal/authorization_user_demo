/**Importing mongoose */
const mongoose = require("mongoose");

const status = require('./userConstants').status

const role = require('./userConstants').role
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;
var userSchema = new Schema({

    firstName: { type: String },

    lastName: { type: String },

    contactNumber: { type: String },

    emailId: { type: String, required: true },

    status: { type: String, enum: [status.ACTIVE, status.ACTIVE], default: status.ACTIVE },

    password: { type: String, required: true },

    age: { type: Number },

    gender: { type: String },

    role: { type: String, enum: [role.ADMIN, role.EDITOR], default: role.EDITOR },

    createdAt: { type: Date, default: Date.now }
})

//Export restaurant module
User = module.exports = mongoose.model('user', userSchema)

User.countDocuments(async function (err, data) {
    if (err) {
        console.log('error while creating admin');
    } else if (data == 0) {
        let obj = {
            "firstName": process.env.admin_name,
            "emailId": process.env.admin_email,
            "password": process.env.admin_password,
            "role": role.ADMIN,
            "status": status.ACTIVE,
            "contactNumber": process.env.adminContactNumber
        };
        let updatedPass = await bcrypt.hashSync(obj.password, 11);
        obj.password = updatedPass;
        let user = new User(obj);
        user.save(function (err, result) {
            (err) ? console.log(err) : console.log('admin created successfully.')
        })
    }
})