
// Socket handler for practice
module.exports = (io) => {
  io.on('connection', (socket) => { // 웹소켓 연결 시
    socket.on('post new log', () => { // 클라이언트에서 newScoreToServer 이벤트 요청 시
      socket.broadcast.emit('receive new log', 'payload');
    });
  });
};
