const Model = require('../baseDbModel')
const dateHelper = require('../../Util/dateTime')
const dbHelper = require('./dbHelper')
const md5 = require('md5')
const dbConstants = require('../dbConstants')

class UserMasterTable extends Model {
    constructor(row, /* adminName */) {
        super('tUsers')
        if (undefined !== row) {

            this.username = row.username
            this.password = md5(row.password)
            this.name = row.name
            this.email = row.email
            this.status = 1;
            
        }
    }

    async getAll() {
        let sql = 'SELECT * FROM ' + this.tableName + ';'
        try {
            const result = await super.executeSql(sql, [])
            return result;
        } catch (ex) {
            console.log(ex);
            throw ex
        }
    }

    async findById(uid) {
        let sql = 'SELECT uid,username,fName,lName,email,phone,orgId,roleId,notes,comments,ts,udf1,veevaLink,nickname,buid,territoryId,managerTerritory FROM ' + this.tableName + ' WHERE uid=?;'
        try {
            const result = await super.executeSql(sql, [uid])
            return result[0];
        } catch (ex) {
            console.log(ex);
            throw ex
        }
    }

    async findByUsername(username) {
        let sql = 'SELECT * FROM ' + this.tableName + ' WHERE username=?;'
        try {
            const result = await super.executeSql(sql, [username])
            return result[0];
        } catch (ex) {
            console.log(ex);
            throw ex
        }
    }

    async update(username, uid, row) {
        let columnValues = []
        const columnNames = []

        let sql = "UPDATE " + this.tableName + " SET "


        dbHelper.prepareUpdate(row, columnNames, columnValues)

        columnNames.push('ts=?')
        sql += columnNames.join(',')
        sql += " WHERE uid = ?"
        columnValues.push(dateHelper.getTimeStamp())
        columnValues.push(uid)

        try {
            const result = await super.executeSql(sql, columnValues)
            if (result.affectedRows > 0) {
                return await this.findById(row.uid)
            }
            return undefined
        } catch (ex) {
            console.log(ex);
            throw ex
        }

    }

    async remove(uid) {
        let sql = 'delete  FROM ' + this.tableName + ' WHERE uid=?;'
        try {
            const result = await super.executeSql(sql, [uid])
            return dbHelper.getFirstRow(result);
        } catch (ex) {
            console.log(ex);
            throw ex
        }
    }

    async removeByUserName(username) {
        let sql = 'delete  FROM ' + this.tableName + ' WHERE username=?;'
        try {
            const result = await super.executeSql(sql, [username])
            return dbHelper.getFirstRow(result);
        } catch (ex) {
            console.log(ex);
            throw ex
        }
    }

    async findByAuthToken(otp) {
        let sql = 'SELECT uid,username,fName,lName,email,phone,orgId,roleId,notes,comments,ts,udf1,veevaLink,territoryId,managerTerritory FROM ' + this.tableName + ' WHERE udf1=?;'
        try {
            const result = await super.executeSql(sql, [otp])
            return result[0];
        } catch (ex) {
            console.log(ex);
            throw ex
        }
    }

    async checkIfUsernameAndEmailAlreadyExists(body) {
        let sql = 'SELECT uid FROM ' + this.tableName + ' WHERE email="' + body.email + '" AND username="' + body.username + '";'
        try {
            const result = await super.executeSql(sql, []);
            return result[0];
        } catch (ex) {
            console.log(ex);
            throw ex
        }
    }
}
module.exports = UserMasterTable

