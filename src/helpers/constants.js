const authConfigJwt = {
    expiresIn: "1h",
    issuer: "dede",
    audience: "dede",
};

const eventsSockets = {
    connection: "connection", // Socket para abrir conexão
    sendMessageBroadcast: "sendMessageBroadcast", // Socket para enviar mensagem
    receiveMessageBroadcast: "receiveMessageBroadcast", // Socket para emitir evento de recebimento de notificação
    previousMessagesBroadcast: "previousMessagesBroadcast" // Socket para pegar mensagens antigas
};

module.exports = { authConfigJwt, eventsSockets };
