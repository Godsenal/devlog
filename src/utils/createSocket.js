import io from 'socket.io-client';

export default function createSocket() {
  const socket = io('/');

  return socket;
}
