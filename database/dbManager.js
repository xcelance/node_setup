const pool = require('./connection')

const query = async (query, params) => {
	return new Promise((resolve, reject) => {
		pool.query(query, params, function (error, results, fields) {
			if (error) {
				reject(error)
				return;
			}
			resolve(results)
		});
	})
}

module.exports = {
	query,
	pool
}
