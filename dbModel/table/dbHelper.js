
const restrictedColumns = [
    "uid",
    "username",
    "isActive",
    "createdBy",
    "token",
    "password",
    "ts",
    "refId",
]

const getFirstRow = (result) => {

    return result && result[0] ? result[0] : null;

}

const getRows = (result) => {

    return result && result[0] ? result[0] : null;

}

const isRowAffected = (result) => {
    return result && result.affectedRows && result.affectedRows >= 1;
};


async function executeAndCheckRowAffected(base, q, params = []) {
    const result = await base.executeSql(q, params);
    return isRowAffected(result);
}

async function executeAndGetFirstRow(base, q, params = []) {
    const result = await base.executeSql(q, params);
    return result && result[0] ? result[0] : null;
}

async function executeAndGetRows(base, q) {
    const result = await base.executeSql(q, []);
    return getRows(result);
}


const prepareUpdate = async (row, columnNames, columnValues) => {
    const keys = Object.keys(row)
    for (let i = 0; i < keys.length; i++) {
        if (restrictedColumns.indexOf(keys[i] == -1)) {
            columnNames.push(keys[i] + " = ? ")
            columnValues.push(row[keys[i]])
        }
    }
}

module.exports = {
    restrictedColumns,
    getFirstRow,
    getRows,
    isRowAffected,
    executeAndCheckRowAffected,
    executeAndGetFirstRow,
    executeAndGetRows,
    prepareUpdate
}