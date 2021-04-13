const mysql = require('mysql');
const config = require('../config/config');

var db = config.db[process.env.ORG];
const pool = mysql.createPool({
    connectionLimit: parseInt(db.connections, 0),
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.database,
    port: parseInt(db.port, 0),
    charset: 'utf8mb4',
    typeCast: function castField(field, useDefaultTypeCasting) {
        if ((field.type === "BIT") && (field.length === 1)) {
            var bytes = field.buffer();
            return (bytes && bytes[0] && bytes[0] === 1);
        }
        return (useDefaultTypeCasting());
    }
});

module.exports = pool;
