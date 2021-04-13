const connection = require('../database/dbManager.js');
const dbHelper = require('./table/dbHelper');
const dateHelper = require('../Util/dateTime');

class Model {
	constructor(tableName) {
		this.tableName = tableName

		this.insertStatement = (keys) => {
			let sql = "INSERT INTO " + this.tableName + " ("
			let columns = [];
			let values = [];
			let questionMarks = []
			for (let i = 0; i < keys.length; i++) {
				if (typeof this[keys[i]] !== 'function' && keys[i] !== 'tableName' && undefined !== this[keys[i]]) {
					columns.push(keys[i])
					questionMarks.push('?')
					values.push(connection.pool.escape(this[keys[i]]))
				}
			}
			sql = sql + columns.join(',') + ") VALUES (" + values.join(',') + ");"
			console.log(sql)
			return { sql, params: values };
		}

		this.findStatement = (params, filler) => {
			let keys = Object.keys(params)
			let sql = "SELECT * FROM " + this.tableName + " WHERE "
			let conditions = []
			let paramForSql = []
			for (let i = 0; i < keys.length; i++) {
				if (undefined === params[keys[i]].value) {
					throw new Error('Condition cannot be undefined for column ' + keys[i])
				}
				conditions.push(keys[i] + " " + params[keys[i]].condition + " ? ")
				paramForSql.push(params[keys[i]].value)
			}
			sql += conditions.join(' ' + filler + ' ') + ';';
			return { sql: sql, params: paramForSql };
		}
	}
	async save() {
		const sql = this.insertStatement(Object.keys(this))
		try {
			var results = await connection.query(sql.sql, [])
			return results.insertId;
		} catch (ex) {
			console.log(ex)
			console.log(ex);
			throw ex;
		}
	}

	async findOr(params) {
		const sqlHash = this.findStatement(params, 'or');
		console.log(sqlHash.sql)
		try {
			var results = await connection.query(sqlHash.sql, sqlHash.params);
			console.log(results);
			return results;
		} catch (ex) {
			console.log(ex)
		}
	}

	async findAnd(params) {
		const sqlHash = this.findStatement(params, 'and');
		console.log(sqlHash.sql)
		try {
			var results = await connection.query(sqlHash.sql, sqlHash.params);
			console.log(results);
			return results;
		} catch (ex) {
			console.log(ex)
		}
	}

	async executeSql(sql, params) {
		try {
			// const escapedParams = params.map(param => connection.pool.escape(param))
			var results = await connection.query(sql, params)
			return results;
		} catch (ex) {
			console.log(ex);
			throw ex
		}
	}



	//common methods:

	async _getAll() {
		let sql = 'SELECT * FROM ' + this.tableName + ';'
		try {
			const result = await this.executeSql(sql, [])
			return result;
		} catch (ex) {
			console.log(ex);
			throw ex
		}
	}

	async _findById(uid) {
		let sql = 'SELECT * FROM ' + this.tableName + ' WHERE uid=?;'
		try {
			const result = await this.executeSql(sql, [uid])
			return dbHelper.getFirstRow(result);
		} catch (ex) {
			console.log(ex);
			throw ex
		}
	}

	async _update(username, uid, row) {
		let columnValues = []
		const columnNames = []

		let sql = "UPDATE " + this.tableName + " SET "


		dbHelper.prepareUpdate(row, columnNames, columnValues)

		columnNames.push(`updatedDate= '${row.updatedDate || dateHelper.getDateTimeNowUtc("YYYY/MM/DD")}'`)
		columnNames.push('ts=?')
		sql += columnNames.join(',')
		sql += " WHERE uid = ?"
		columnValues.push(dateHelper.getTimeStamp())
		columnValues.push(uid)
		try {
			const result = await this.executeSql(sql, columnValues)
			if (result.affectedRows > 0) {
				return await this._findById(row.uid)
			}
			return undefined
		} catch (ex) {
			console.log(ex);
			throw ex
		}

	}

	async _remove(uid) {
		let sql = 'delete  FROM ' + this.tableName + ' WHERE uid=?;'
		try {
			const result = await this.executeSql(sql, [uid])
			return dbHelper.getFirstRow(result);
		} catch (ex) {
			console.log(ex);
			throw ex
		}
	}
}
module.exports = Model;
