const db = require('mongoose');
db.connect('mongodb://mongo/hyperplanning');

module.exports = db