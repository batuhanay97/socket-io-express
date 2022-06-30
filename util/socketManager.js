const { SOCKET } = require('./constant');
const { userSocketStatus, sendMessage, seeMessage, getUnseenMessage } = require('./helper');
const models = require('../model');

module.exports = (socket) => {

    socket.on(SOCKET.ONLINE, () => userSocketStatus(SOCKET.ONLINE, socket))

    socket.on(SOCKET.MESSAGE, (message) =>  sendMessage(socket, message))

    socket.on(SOCKET.SEETHEMESSAGE, (messageId) =>  seeMessage(socket, messageId))

    socket.on(SOCKET.GETUNSEENMESSAGES, (callback) =>  getUnseenMessage(socket, callback))

    socket.on(SOCKET.DISCONNECT,  () =>  userSocketStatus(SOCKET.DISCONNECT, socket))

};
