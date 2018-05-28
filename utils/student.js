var redis = require('redis')
var client = redis.createClient('6379', 'redis')
var Models = require('../models/models.js')
var ObjectId = require('mongoose').Types.ObjectId;

function getBulletin(xid) {
    return new Promise((resolve, reject) => {
        var data_list = []
        var list = []
        var note_array = []
        var itemsProcessed = 1
        var key = ''
        var exists = false
        calcMoyMatiere(xid)
        Models.Note.find({username: xid}, function (err, notes){
            var data_list = []
            client.get(xid, function(err, reply) {
                var user = reply
                user = JSON.parse(user)
                name = user.firstname + ' ' + user.lastname
            });
            notes.forEach(function(element) {
                getNotes(element).then((result) => {
                    data_list.push(result)
                    if(notes.length == data_list.length) {
                        data_list.forEach(function(element){
                            if(list.length > 0) {
                                for (var i = 0; i < list.length; i++) {
                                    if(list[i].Matiere == element.Matiere) {
                                        note_array = list[i].Notes
                                        key = list[i].Matiere
                                        note_array.push({Note: element.Notes[0].Note, Coef: element.Notes[0].Coef})
                                        list[i] = {Matiere: key, Notes: note_array}
                                        exists = true
                                    }
                                }
                                if (exists == false) {
                                    note_array = []
                                    note_array.push({Note: element.Notes[0].Note, Coef: element.Notes[0].Coef})
                                    list.push({Matiere: element.Matiere, Notes: note_array})
                                }
                            } else {
                                note_array.push({Note: element.Notes[0].Note, Coef: element.Notes[0].Coef})
                                list.push({Matiere: element.Matiere, Notes: note_array})
                            }
                            if (itemsProcessed == data_list.length) {
                                var cpt = 0
                                calcMoyGen(xid).then((result) => {
                                    var returnList = {'User': name, 'Notes': list, 'Moy':result}
                                    calcMoyMatiere(xid).then((result) => {
                                        result.forEach(function(element) {
                                            for(var i = 0; i < returnList.Notes.length; i++) {
                                                if ( element.Matiere == returnList.Notes[i].Matiere) {
                                                    returnList.Notes[i].Moyenne = element.Moy
                                                    cpt ++
                                                }
                                            }
                                            if(cpt == result.length) {
                                                resolve(returnList)
                                            }

                                        })
                                    })
                                })
                            }
                            exists = false
                            itemsProcessed ++
                        })
                    }
                })
            })
        })
    })
}

function getNotes(element) {
    var note_array = []
    return new Promise((resolve, reject) => {
        Models.Matiere.find({_id: element.matiere_id}, function (err, mat){
            var key = mat[0].matiere
            note_array.push({Note: element.Note, Coef: element.Coef})
            resolve({Matiere: key, Notes: note_array})
        })
    })
}

function calcMoyGen(user) {
    return new Promise((resolve, reject) => {
        Models.Note.aggregate([
            {$match: {
                username: user
            }},
            {$group: {
                _id:'$username',
                numerator: {$sum:{$multiply:["$Note", "$Coef"]}},
                denominator: {$sum: "$Coef"},
            }}
        ], function (err, moy) {
           resolve(precisionRound(moy[0].numerator/moy[0].denominator, 1))
        })
    })
}

function getMatiere(xid , element) {
    return new Promise((resolve, reject) => {
        Models.Matiere.find({}, function(err, result){
            getMatiereName(result, element).then((result) => {
                resolve(result)
            })
        })
    })
}

function getMatiereName(Matieres, list) {
    return new Promise((resolve, reject) => {
        var returnList = []
        Matieres.forEach(function(element) {
            for(var i = 0; i < list.length; i++){
                if(element._id == list[i]._id){
                    var tmp = {Matiere: element.matiere, Moy: precisionRound(list[i].numerator / list[i].denominator, 1)}
                    returnList.push(tmp)
                }
            }
            if(returnList.length == list.length) {
                resolve(returnList)
            }
        })
    })
}

function calcMoyMatiere(user) {
    return new Promise((resolve, reject) => {
        var moy_list = []
        Models.Note.aggregate([
            {$match: {
                username: user
            }},
            {$group: {
                _id:'$matiere_id',
                numerator: {$sum:{$multiply:["$Note", "$Coef"]}},
                denominator: {$sum: "$Coef"},
            }}
        ], function (err, moy) {
            getMatiere(moy._id, moy).then((result) => {
                resolve(result)
            })
        })
    })
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

module.exports = {getBulletin}
