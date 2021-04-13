const dbModel = require("../dbModel/table/commonQueries");
const jwtHelper = require('../Util/jwtHelper');

const authenticateUser = async (username, password) => {
    let obj = null;
    const model = new dbModel();
    var user = await model.authenticate(username, password);
    if (user) {
        delete user.password;
        //get user org:
        let org = await model.getOrg(user.orgId)

        if (org) {
            //generate token
            let tokenObj = {
                username,
            }

            let token = await jwtHelper.getToken(tokenObj);
            var session = await model.addSession(username, token);
            if (session) {
                obj = {
                    token,
                    user,
                    org
                };
            }
        }
    }

    return obj;
};

const getUserDetails = async (session) => {

    let obj = null;
    const model = new dbModel();
    var user = await model.getUser(session.username);
    
    return user;
};

const resetPassword = async (username, email, dob) => {


    //check if user exists and email and dob is correct:
    let obj = null;
    const model = new dbModel();

    let user = await model.getUserForPasswordReset(username, email, dob);
    if (user) {
        //let randomNumber = Math.floor(Math.random() * 1000000);
        let tokenObj = {
            username,
        }
        let token = await jwtHelper.getToken(tokenObj);

        //update password:
        let isTokenset = await model.setUserToken(username, token);

        if (isTokenset) {

            const UserObj = { emailType: 'Forgot Password', email: email, username:username, token: token };

            //remove all user sessions.
            await model.removeUserSessions(username);
        }
        obj = {

        }

    }

    return obj;
}

const logout = async (headers) => {
    const token_string = headers.authorization.split("Bearer ")[1];
    const model = new dbModel();

    const resp = await model.invalidateUserSession(token_string);
    if(resp){
        return {};
    }else{
        return {}
    }
}

const getUserSession = async (token) => {
    let obj = null;
    let m = new dbModel();
    let session = await m.getUserSession(token);

    if (session) {
        obj = session;
    }
    return obj;
}

const updateresetPassword = async (data) => {
    let obj = null;
    const model = new dbModel();

    let user = await model.getUserForResetPassword(data.token);
    if (user) {
        let isPasswordset = await model.setUserPassword(user.username, data.password);
        if(isPasswordset){
            obj={};
        }

    }

    return obj;
}

module.exports = {
    authenticateUser,
    resetPassword,
    logout,
    getUserSession,
    getUserDetails,
    updateresetPassword
}