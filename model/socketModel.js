class SocketModel {


    constructor(client, accessToken, session) {
        this.clientId = client.id;
        this.client = client;
        this.accessToken = accessToken;
        this.session = session;
        this.uid = session.uid;
    }



    sendMessage(data, param) {


    }
}

module.exports = SocketModel;