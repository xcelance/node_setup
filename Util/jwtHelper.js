var jwt = require('jsonwebtoken')
const appConfig = require('../appConfig.json');

const getToken = async (payload) => {
    return jwt.sign(payload, appConfig.authKey, { expiresIn: appConfig.sessionExpiry });
}

const isValid = async (token) => {
    try {
        return jwt.verify(token, appConfig.authKey);
    }
    catch (ex) {
        return null;
    }
}

module.exports = {
    getToken,
    isValid
}