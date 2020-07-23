module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, dbb) {
        var category_module = require('../component/category_component')(mongo, ObjectID, url, assert, dbb);
        var user_exist_module = require('../component/token_verification')(mongo, ObjectID, url, assert, dbb);

        app.post('/add_category', function (req, res) {
            // console.log(req.body);


            try {
                
               var token = req.header('user_token');

                user_exist_module.userExists(token,function (result ,error,message) {
                    if(error)
                    {
                        res.json({
                            status: false,
                            message: message
                        });
                    } else {

                        var new_category = {
                            category_name: req.body.category_name
                        };
                        category_module.add_category(new_category, function (result, error, message) {
                            if (error) {
                                res.json({
                                    status: false,
                                    message: message
                                });
                            } else {
                                res.json({
                                    status: true,
                                    message: message,
                                    result: result
                                });
                            }
                        });

                    }
                });

                
            } catch (er) {
                console.log("error occures: " + er);
                res.json({
                    status: false,
                    message: "failed at try block...!"
                });
            }
        });

        app.post('/delete_category', function (req, res) {
            // console.log(req.body);
            try {

                var token = req.header('user_token');

                user_exist_module.userExists(token, function (result, error, message) {
                            if (error) {
                                res.json({
                                    status: false,
                                    message: message
                                });
                            } else {

                                if (req.body.hasOwnProperty("category_id")) {
                                    // console.log('in');
                                    category_module.delete_category(req.body.category_id, function (result, error, message) {
                                        if (error) {
                                            res.json({
                                                status: false,
                                                message: message
                                            });
                                        } else {
                                            res.json({
                                                status: true,
                                                message: message
                                            });
                                        }


                                    });
                                } else {
                                    if (req.body.hasOwnProperty("category_id") == false) {
                                        res.json({
                                            status: false,
                                            message: "id parameter is missing"
                                        });
                                    }
                                }

                            }

                        });

             
            } catch (er) {
                console.log("error occured : " + er);
                res.json({
                    status: false,
                    Message: "failed at try"
                });
            }
        });

        app.post('/view_all_categorys', function (req, res) {
            try {

                var token = req.header('user_token');

                user_exist_module.userExists(token, function (result, error, message) {
                            if (error) {
                                res.json({
                                    status: false,
                                    message: message
                                });
                            } else {

                                category_module.view_all_categorys(function (result, error, message) {
                                    if (error) {
                                        res.json({
                                            status: false,
                                            message: message
                                        });
                                    } else {
                                        res.json({
                                            status: true,
                                            message: message,
                                            result: result
                                        });
                                    }
                                });

                            }
                        });  

               
            } catch (er) {
                confirm.log("Error Occured: " + er);
                res.json({
                    status: false,
                    message: "failed at try"
                })
            }
        });

        app.post('/update_category',function (req,res) {
            // console.log(req.body);
            try{

                var token = req.header('user_token');

                user_exist_module.userExists(token, function (result, error, message) {
                            if (error) {
                                res.json({
                                    status: false,
                                    message: message
                                });
                            } else { 

                                if (req.body.hasOwnProperty("category_id")) {
                                    category_module.update_category(req.body.category_id, req.body.category_name, function (result, error, message) {

                                        if (error) {
                                            res.json({
                                                status: false,
                                                message: message
                                            });
                                        } else {
                                            res.json({
                                                status: true,
                                                message: message
                                            });
                                        }

                                    });
                                } else {
                                    if (req.body.hasOwnProperty("category_id") == false) {
                                        res.json({
                                            status: false,
                                            message: "id parameter is missing"
                                        });
                                    }
                                }
                            }
                });
                } catch (er) {
                    console.log("error occured : " + er);
                    res.json({
                        status: false,
                        Message: "failed at try"
                    });
                } 
        });

    }
}