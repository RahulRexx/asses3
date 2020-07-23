module.exports = function (mongo, ObjectID, url, assert, dbb) {
    var user_exist_module = {

        userExists: function (user_token, callBack) {
            try {
                var userExists = false;

                mongo.connect(url, 
                    { useNewUrlParser: true },
                    function (err, db) {
                        assert.equal(null, err);
                        var cursor = db.db().collection(dbb.USER).find({
                            "user_token": user_token
                        });
                        cursor.forEach(function (doc, err) {
                            assert.equal(null, err);
                            userExists = true;
                        }, function () {
                            if (userExists) {
                                callBack(null, false, "User Exists!");
                            } else {
                                callBack(null, true, "User Does not Exists!");
                            }
                            db.close();
                        });
                    });
            } catch (e) {
                callBack(null, true, e);
            }
        },


    }
    return user_exist_module;
}