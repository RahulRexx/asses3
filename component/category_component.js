module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var category_module = {

        add_category: function (new_category, callBack) {
            try {
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, function (err, db) {

                    assert.equal(null, err);

                    db.db().collection(dbb.CATEGORYS).insertOne(new_category, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        } else {
                            callBack(result, false, "category Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        delete_category: function (id, callBack) {
            try {
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection(dbb.CATEGORYS).deleteOne({
                        "_id": new ObjectID(id)
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        } else {
                            // console.log(result);
                            if(result.deletedCount === 0) {
                                callBack(result, true, "Id does Not exist");
                            } else {
                                callBack(result, false, "category Removed Successfully");
                            }
                            
                        }
                        db.close();
                    })

                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        view_all_categorys: function (callBack) {
            try {
                categorys = [];
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection(dbb.CATEGORYS).find();
                
                    cursor.forEach(function (doc, err) {
                       
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        } else {
                            categorys.push(doc);
                            console.log('document is ', doc);
                        }
                    }, function () {


                        if (categorys.length == 0) {
                            callBack(null, true, "No category's Found");
                        } else {
                            callBack(categorys, false, "categorys Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        update_category: function (id,name,callBack) {
            try {
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, function (err, db) {
                    db.db().collection(dbb.CATEGORYS).updateOne({ "_id": new ObjectID(id) }, {
                        $set: {
        
                            category_name: name
                         
                        }
                    }, { upsert: false }, function (err, result) {
                        if (err) {
                            callBack(null, true, err);
                        } else {
                                // console.log(result);
                            if (result.matchedCount === 0) {
                                callBack(result, true, "Id does Not exist");
                            } else {
                                callBack(result, false, "category Updated Successfully");
                            }

                        }
                        db.close();
                    });
                });
            } catch (e) {
                callBack(null, true, e);
            }
        },

    }
    return category_module;
}