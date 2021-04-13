const commonModel = require("../dbModel/table/commonQueries");
const userModel = require("../dbModel/table/tUserMaster")
const dbConstants = require('../dbModel/dbConstants');


const get = async (session, id) => {
    let obj = null;
    let m = new userModel();
    let user = await m.findById(id);
    if (user) {
        obj = {
            user
        }
    }
    //todo:  line and veeva implementation
    return obj
}

module.exports = {
    get
}
