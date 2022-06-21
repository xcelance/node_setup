const model = require("../baseDbModel.js");
const dbHelper = require("./dbHelper");
const dateTime = require("../../Util/dateTime.js");
const { getDateTimeNowUtc } = require("../../Util/dateTime.js");

class CommonQueries extends model {
  constructor() {
    super("tUsers");
  }

  async authenticate(username, password) { 
    let q = `SELECT * FROM tUsers WHERE username = ? and password = md5(?);`;

    try {
      const result = await super.executeSql(q, [username, password]); console.log(result)
      return result && result[0] ? result[0] : null;
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  async getUser(username) {
    let sql = `SELECT * FROM tUsers WHERE username = ?;`;
    try {
      const result = await super.executeSql(sql, [username]);
      return result && result[0] ? result[0] : null; console.log(result)
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  async getUserByEmail(email) {
    email = escape(email);
    let sql = `SELECT * FROM tUsers WHERE email = "${email}"` ;
    try {
      const result = await super.executeSql(sql, []);
      return result && result[0] ? result[0]  : null;
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  async addSession(username, token) {
    let q = `INSERT INTO tUserSession (token, username, isValid) VALUES (?, ?, b'1');`;

    try {
      const result = await super.executeSql(q, [token, username]);
      return result && result.affectedRows && result.affectedRows == 1;
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  async getUserSession(token) {
    let q = `SELECT * FROM tUserSession as A inner join tUsers as B ON A.username = B.username WHERE A.token = ?;`;

    try {
      return await dbHelper.executeAndGetFirstRow(this, q, [token]);
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  async removeUserSession(token) {
    let q = `delete FROM tUserSession WHERE token = ?;`;

    try {
      const result = await super.executeSql(q, [token]);
      return dbHelper.isRowAffected(result);
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  async checkIfEmailAlreadyExists(email) {
    let q = `SELECT * FROM tUsers WHERE email = ?;`;

    try {
      return await dbHelper.executeAndGetFirstRow(this, q, [email]);
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }

  async setUserToken(username, token) {
    let q = `update tUsers set token  = ? WHERE username = ?;`;

    try {
      const result = await super.executeSql(q, [token, username]);
      return dbHelper.isRowAffected(result);
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }
}

module.exports = CommonQueries;
