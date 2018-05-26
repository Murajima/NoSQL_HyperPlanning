const Models = require('../models/models.js')

function createNote (xid, matiere_id, note, coef) {
    return new Promise((resolve, reject) =>{
        var note_add = new Models.Note({
            username: xid,
            matiere_id: matiere_id,
            Coef: coef,
            Note: note
        })
        note_add.save().then(() => {
            resolve('saved')
        })
    })
}

module.exports = {createNote}
