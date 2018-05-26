const db = require('./db')

var userSchema = new db.Schema({
    nom: { type: String },
    prenom: { type: String },
    etat: { type: String },
    classe_id: { type: Array},
    matiere_id: { type: Array},
    username: { type: String },
    password: { type: String}
}, { collection : 'User' });

var noteSchema = new db.Schema({
    username: { type: String },
    matiere_id: { type: String },
    Coef: { type: Number },
    Note: { type: Number }
}, { collection : 'Note' });

var classeSchema = new db.Schema({
    type: { type: String },
    niveau: { type: Number },
    classe: { type: Number },
    matiere_id: { type: Array}
}, { collection : 'Classe' });

var matiereSchema = new db.Schema({
    matiere: { type: String },
    nom: { type: String },
}, { collection : 'Matiere' });

var User = db.model('User', userSchema);
var Note = db.model('Note', noteSchema);
var Classe = db.model('Classe', classeSchema);
var Matiere = db.model('Matiere', matiereSchema);

module.exports = {User, Note, Classe, Matiere};
