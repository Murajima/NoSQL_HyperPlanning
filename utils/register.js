const Models = require('../models/models.js')
const bcrypt = require('bcrypt-nodejs')

function createUser (username, password, firstname, lastname) {
    return new Promise((resolve, reject) =>{
        // Creating one user.
        var someone = new Models.User({
            pseudo: username,
            password: generateHash(password),
            nom: lastname,
            prenom: firstname,
            etat: 'etudiant',
        })
        // Saving it to the database.
        someone.save().then(() => {
            resolve('saved')
        })
    })
}

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

module.exports = {createUser}
