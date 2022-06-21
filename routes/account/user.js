var express = require('express');
var router = express.Router();
// const config = require('../../config/config');
var statusCode = require("../../Util/statusCode.js")
var baseResponse = require("../../model/baseResponse.js");
// const moment = require('moment');
// const { filter } = require('underscore');
const middleware = require('../filter')
const accountController = require('../../controller/accountController.js');
const userController = require('../../controller/userController.js');




router.post("/login", async (req, res) => {
    const result = await accountController.authenticateUser(req.body);
    const response = new baseResponse(res);

    if (!result) {

        response.sendResponse(null, false, "", statusCode.Unauthorized, null);

    }
    else
        response.sendResponse(result, true, "", statusCode.OK, null);
});


router.post("/resetPassword", async (req, res) => {
    const result = await accountController.resetPassword(req.body.username, req.body.confirmEmail, req.body.confirmDob);
    const response = new baseResponse(res);

    if (!result) {

        response.sendResponse(null, false, "", statusCode.Unauthorized, null);

    }
    else
        response.sendResponse(result, true, "", statusCode.OK, null);
});

router.get("/getAllRoles", middleware.authenticate, async (req, res) => {
    const result = await accountController.getAllUserRoles(req.session);
    const response = new baseResponse(res);

    if (!result) {

        response.sendResponse(null, false, "", statusCode.Unauthorized, null);

    }
    else
        response.sendResponse(result, true, "", statusCode.OK, null);
});

router.get("/logout", middleware.authenticate, async (req, res) => {
    const result = await accountController.logout(req.headers);
    const response = new baseResponse(res);

    if (!result) {
        response.sendResponse(null, false, "", statusCode.Unauthorized, null);
    } else {
        response.sendResponse(result, true, "", statusCode.OK, null);
    }
});

router.get("/info", middleware.authenticate, async (req, res) => {
    const result = await accountController.getUserDetails(req.session);
    const response = new baseResponse(res);

    if (!result) {

        response.sendResponse(null, false, "", statusCode.Unauthorized, null);

    }
    else
        response.sendResponse(result, true, "", statusCode.OK, null);
});

router.post("/updateresetPassword", async (req, res) => {
    const result = await accountController.updateresetPassword(req.body);
    const response = new baseResponse(res);

    if (!result) {

        response.sendResponse(null, false, "", statusCode.Unauthorized, null);

    }
    else
        response.sendResponse(result, true, "", statusCode.OK, null);
});


router.post("/isAvailableInUsers", async (req, res) => {
    function processResponse(result) {
        const response = new baseResponse(res);

        if (!result) {
            response.sendResponse(false, false, "", statusCode.OK, null);
        } else {
            response.sendResponse(true, true, "", statusCode.OK, null);
        }
    }
    const result = await userController.checkIfUsernameAndEmailAlreadyExists(req.body);
    processResponse(result);

});

router.post("/checkEmail", async (req, res) => {
    const { email } = req.body;
    const result = await accountController.getIamOrgId(email);
    const response = new baseResponse(res);

    if (!result) {
        response.sendResponse(null, false, "", statusCode.Unauthorized, null);

    }
    else
        response.sendResponse(result, true, "", statusCode.OK, null);
});

module.exports = router;