const db = require('./db')

var kittySchema = db.Schema({
  name: String
});

var Kitten = db.model('Kitten', kittySchema);


module.exports = {Kitten}