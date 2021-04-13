module.exports = {
    "db": {
        "vcalc": {
            "host": process.env.DB_HOST,
            "username": process.env.DB_USERNAME,
            "password": process.env.DB_PASSWORD,
            "database": process.env.DB_DATABASE,
            "connections": process.env.DB_CONNECTIONS,
            "port": process.env.DB_PORT,
        }
    }
};
