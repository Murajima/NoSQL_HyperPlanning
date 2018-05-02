const Models = require('../models/models.js')
const bcrypt = require('bcrypt-nodejs')


function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}