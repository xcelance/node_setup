const moment = require('moment')

const getDateTime = () => {
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
}
const getDateTimeBasedOnType = (dateType) => {

    switch (dateType) {
        case 'all':
            {
                return getAllTimeDiff();
                break;
            }

        case 'week':
            {
                return getOneWeekDiff();
                break;
            }

        case 'month':
            {
                return getOneYearDiff();
                break;
            }

        case 'year':
            {
                return getOneYearDiff();
                break;
            }

        case 'default':
            {

                return getOneYearDiff()
                break;
            }
    }

}

const today = () => {
    return moment(Date.now()).format('YYYY-MM-DD')
}

const getOneWeekDiff = () => {
    var obj = {
        from: "",
        to: "",
    }
    var oneWeekAgo = new Date(Date.now());
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    obj.to = moment(Date.now()).format('YYYY-MM-DD');
    obj.from = moment(oneWeekAgo).format('YYYY-MM-DD');
    return obj;
}


const getOneYearDiff = () => {
    var obj = {
        from: "",
        to: "",
    }
    var oneYearAgo = new Date(Date.now());
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    obj.to = moment(Date.now()).format('YYYY-MM-DD') + "";
    obj.from = moment(oneYearAgo).format('YYYY-MM-DD') + "";

    return obj;
}


const getAllTimeDiff = () => {
    var obj = {
        from: "",
        to: "",
    }
    var oneYearAgo = new Date(Date.now());
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    obj.to = moment(Date.now()).format('YYYY-MM-DD') + "";
    obj.from = "1900-01-01"; //moment(oneYearAgo).format('YYYY-MM-DD') + "";

    return obj;
}

const getOneMonthDiff = () => {
    var obj = {
        from: "",
        to: "",
    }
    var oneMonthAgo = new Date(Date.now());
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    obj.to = moment(Date.now()).format('YYYY-MM-DD');
    obj.from = moment(oneMonthAgo).format('YYYY-MM-DD');
    return obj;
}

const parseDate = (date) => {
    return moment(date, 'DD-MM-YYYY').toDate();
}

const parseDateForSql = (date) => {
    // return moment(date, 'YYYY-MM-DD HH:mm:ss').toDate();
    return (new Date(date).toISOString());
}

const getTimeStamp = () => {
    var d = new Date();
    var n = d.getTime();
    return n;
}

const getDateTimeNowUtc = (format) => {
    var date = moment.utc().format(format || "YYYY-MM-DD HH:mm:ss");
    return date;
}

const getDateTimeNow = (format) => {
    var date = moment.format(format || "YYYY-MM-DD HH:mm:ss");
    return date;
}

const getNoOfWeekDifference = (date) => {
    var today = moment()
    var startDate = moment(date);
    return today.diff(startDate, 'week')
}

module.exports = {
    getDateTime,
    parseDate,
    parseDateForSql,
    today,
    getTimeStamp,
    getOneWeekDiff,
    getOneYearDiff,
    getOneMonthDiff,
    getAllTimeDiff,
    getDateTimeBasedOnType,
    getDateTimeNow,
    getDateTimeNowUtc,
    getNoOfWeekDifference
}