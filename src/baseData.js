/**
 * Created by jlmconsulting on 13/09/2017.
 */
const MongoClient = require('mongodb').MongoClient
    , ObjectID = require('mongodb').ObjectID
    , assert = require('assert');
var base64 = require('base-64');
var inarray = require('inarray');
var async = require('async');
var _ = require("lodash");

const getData = (id, callback) => {
    MongoClient.connect(MONGO_URL, function (err, db) {
        if (err) throw err;
        db.collection("connect").find({_id: id}).limit(1).toArray(function (err, result) {
            if (err) throw err;
            callback(result[0] || null);
            db.close();
        });
    });
};
const updateData = (coll, id, learntArr) => {
    var item = {
        base64: Arr2bitmap(base64.encode(JSON.stringify(learntArr)))
    };

    MongoClient.connect(MONGO_URL, function (err, db) {
        assert.equal(null, err);
        db.collection(coll).updateOne({"_id": id}, {$set: item}, function (err, result) {
            assert.equal(null, err);
            // console.log('Item updated');
            db.close();
        });
    });
    return id;
};
const findLearnt = (Str, callback) => {
    MongoClient.connect(MONGO_URL, function (err, db) {
        if (err) throw err;
        db.collection("learnt").find({data: Str}).limit(1).toArray(function (err, result) {
            if (err) throw err;
            callback(result[0] || null);
            db.close();
        });
    });
};
const removeConnect = (coll, id) => {
    MongoClient.connect(MONGO_URL, function (err, db) {
        if (err) throw err;
        db.collection(coll).deleteOne({"_id": ObjectID(id)}, function (err, result) {
            assert.equal(null, err);
            console.log('Item deleted', id);
            db.close();
        });
    });
};
const insertConnect = (id, Str) => {
    // let preSetID =  || ObjectID();/
    var item = {ref: ObjectID(id), data: Str};

    MongoClient.connect(MONGO_URL, function (err, db) {
        assert.equal(null, err);
        db.collection('learnt').insertOne(item, function (err, result) {
            assert.equal(null, err);
            // console.log('Item inserted');
            db.close();
        });
    });
    return item.ref;
};

const updateConnect = (ID, learntArr) => {

    var item = {
        _id: ID,
        base64: Arr2bitmap(base64.encode(JSON.stringify(learntArr)))
    };
    MongoClient.connect(MONGO_URL, function (err, db) {
        assert.equal(null, err);
        db.collection('connect').insertOne(item, function (err, result) {
            assert.equal(null, err);
            db.close();
        });

    });
    return item._id;
};
let is_Learnt = (ID, a) => {
    let b = [];
    return _.map(a, (c) => {
        b.push(c)
    }), updateConnect(ID, b);
};

const dateFromobj_ID = (obj_ID) => {
    if (typeof obj_ID == 'undefined')
        throw new Error('dateFromobj_ID is undefined!!');
    return new Date(parseInt(obj_ID.substring(0, 8), 16) * 1000).getTime();
};
const Arr2bitmap = (learntArr) => {
    return new Buffer(learntArr, 'base64');
};
const bitmap2Arr = (learntArr) => {
    let bit = base64.decode(new Buffer(learntArr.buffer).toString('base64'));
    Buffer.allocUnsafe(5);
    return bit;
};
const baseData = () => {
    return JSON.parse(base64.decode('WzE1MDU1MDU0MTUzMDgsMjYxMDA0MzAxNTMwOF0='));
};

module.exports = function (Str, callback) {
    let ObjID = ObjectID().toString();
    if ('string' !== typeof Str || Str == null)throw new Error('Request is not a string!!');
    if ('undefined' == typeof ObjID)throw new Error('Request is undefined!!');
    if ('string' != typeof ObjID)throw new Error('Request is not a string!!');
    if (24 !== ObjID.length)throw new Error('Please provide an objectId string');

    async.parallel({
        findLearnt: function (call) {
            findLearnt(Str, function (res) {
                if (res !== null) {
                    call(null, res.ref, res._id);
                } else
                    call(null, null);

            });
        },
        baseObj: function (call) {
            call(null, new Date().getTime() + new Date().getMilliseconds());
        },
        baseData: function (call) {
            call(null, baseData());
        },
    }, function (err, result) {
        let reView = [];
        if (result.findLearnt !== null) {
            getData(ObjectID(result.findLearnt[0]), (doc)=> {
                if (doc !== null) {
                    reView = JSON.parse(base64.decode(new Buffer(doc.base64.buffer).toString('base64')));
                    reView.push(result.baseObj);
                    updateData('connect', result.findLearnt[0], _.uniq(reView));
                    callback(_.uniq(reView))
                }
            });

        } else {
            reView.push(result.baseData, result.baseObj);
            is_Learnt(insertConnect(ObjID, Str), _.flattenDeep(reView));
            callback(_.flattenDeep(reView))
        }
    })
};
