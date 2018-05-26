const db = require('./db')

var userSchema = new db.Schema({
    pseudo: { type: String },
    nom: { type: String },
    prenom: { type: String },
    etat: { type: String },
    username: { type: String },
    password: { type: String}
}, { collection : 'User' });

var noteSchema = new db.Schema({
    User: { type: String },
    matiere: { type: String },
    Coef: { type: Number },
    Note: { type: Number }
}, { collection : 'Note' });

var classeSchema = new db.Schema({
    type: { type: String },
    niveau: { type: Number },
    classe: { type: Number },
}, { collection : 'Classe' });

var matiereSchema = new db.Schema({
    matière: { type: String },
    professeur1: { type: String },
}, { collection : 'Matière' });

var User = db.model('User', userSchema);
var Note = db.model('Note', noteSchema);
var Classe = db.model('Classe', classeSchema);
var Matiere = db.model('Matiere', matiereSchema);

module.exports = {User, Note, Classe, Matiere};
