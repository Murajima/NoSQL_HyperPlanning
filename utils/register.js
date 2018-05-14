const Models = require('../models/models.js')
const bcrypt = require('bcrypt-nodejs')
const db = require('../models/db.js')

var newUser = db.model('User', db.userSchema)

function createUser (username, password, firstname, lastname) {
  console.log('toto')
  return new Promise((resolve, reject) =>{
    console.log('tata')
    // Creating one user.
    var someone = new newUser ({
      pseudo: username,
      password: bcrypt.password,
      nom: lastname,
      prenom: firstname,
      etat: 'etudiant',
    })
    console.log(someone)
    // Saving it to the database.
    someone.save(function (err) {if (err) console.log ('Error on save!')})
  })
}

module.exports = {createUser}
