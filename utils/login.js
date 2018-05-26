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
                if(element.pseudo == username && validPassword(password, element.password) ){
                    resolve({'username': element.pseudo, 'xid': element._id, 'etat': element.etat})
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