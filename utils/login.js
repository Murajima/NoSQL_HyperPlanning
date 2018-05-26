const Models = require('../models/models.js')
const bcrypt = require('bcrypt-nodejs')


function getUsers () {
    return new Promise((resolve, reject) =>{
        Models.User.find({}, function (err, users){
            resolve(users)
        })
    })
}

function loginOK(username, password) {
    USER = {}
    return new Promise((resolve, reject) => {
        getUsers().then((result) => {
            USER = result
            USER.forEach(function(element){
                if (password == 'azerty' && element.password == 'azerty') {
                    if (element.username == username && element.password == password) {
                        resolve({'username': element.username, 'xid': element._id, 'etat': element.etat, 'matiere_id': element.matiere_id, 'lastname': element.nom, 'firstname': element.prenom})
                    }
                } else if (element.username == username && validPassword(password, element.password) ){
                    resolve({'username': element.username, 'xid': element._id, 'etat': element.etat, 'lastname': element.nom, 'firstname': element.prenom})
                }
            })
            reject()
        })
    })
}


function validPassword(passwordUser, passwordDB) {
    return bcrypt.compareSync(passwordUser, passwordDB)
}

module.exports = {loginOK}