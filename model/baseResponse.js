class BaseResponseModel {


    constructor(res) {
        this.res = res;

    }

    setHeader(key, value) {
        this.res.setHeader(key, value);
    }

    sendResponse(data, isSuccess, errMessage, status, param) {
        var responseObject = {
            data: data,
            isSuccess: isSuccess,
            errMessage: errMessage,
            outParam: param
        }
        this.res.statusCode = status;
        this.res.json(responseObject);

    }

    sendPlainResponse(data, isSuccess, errMessage, status, param) {
        var responseObject = data;

        this.res.json(responseObject);

    }
}

module.exports = BaseResponseModel;