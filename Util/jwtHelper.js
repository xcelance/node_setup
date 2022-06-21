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

const destroy = async (token) => {
	jwt.destroy(token);
	return true;
}

module.exports = {
    getToken,
    isValid,
    destroy
}