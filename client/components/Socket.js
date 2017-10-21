import React from 'react';
import io from 'socket.io-client';

const Socket = () => io.connect('http://localhost:3000', { transports: ['websocket'] });

export default Socket;
