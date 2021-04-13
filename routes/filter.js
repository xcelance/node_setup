const accountController = require('../controller/accountController.js')
const jwtHelper = require('../Util/jwtHelper');

const appConfig = require('../appConfig.json');
const dbConstants = require('../dbModel/dbConstants.js');
const { body, validationResult } = require('express-validator');

const send401 = (res) => {
    res.status(401)
    res.json()
}
const send403 = (res) => {
    res.status(403)
    res.json()
}

const authenticate = async (req, res, next) => {
    const Authorization = req.get('Authorization')
    let token = null;
    let result = null;
    if (Authorization) {
        token = Authorization.replace('Bearer ', '')
        result = await jwtHelper.isValid(token);
    }

    if (null === token || result == null) {
        send401(res);
        return
    } else if (token == appConfig.superKey) {
        //override key, to bypass/test api
        req.session = null;
        next();
    } else {

        var session = await accountController.getUserSession(token)
        if (session) {
            req.session = session;
            next();
        } else {
            send401(res);
        }
    }
}

const isAdmin = async (req, res, next) => {
    if (req.session.roleId == dbConstants.roles.superAdmin || req.session.roleId == dbConstants.roles.orgAdmin || req.session.roleId == dbConstants.roles.SalesRep) {
        next();
    }
    else {
        send403(res);
    }
}

const isNotAdmin = async (req, res, next) => {
    if (req.session.roleId == dbConstants.roles.SalesRep || req.session.roleId == dbConstants.roles.MSL) {
        next();
    }
    else {
        send403(res);
    }
}

const validateSuperKey = async (req, res, next) => {
    const authToken = req.get('Authorization')
    if (undefined === authToken) {
        send401(res);
        return
    } else if (authToken == appConfig.superKey) {
        req.userProfile = null;
        next();
    } else {
        var result = await accountController.validateSession(authToken)
        if (result) {
            req.user = result;
            next();
        } else {
            send401(res);
        }
    }
}

const processRequestErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else {
        next();
    }
}

module.exports = {
    authenticate,
    validateSuperKey,
    isAdmin,
    processRequestErrors,
    isNotAdmin
}