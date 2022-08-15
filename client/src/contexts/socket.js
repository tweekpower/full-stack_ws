import { createContext } from 'react';
import io from 'socket.io-client';
const ENDPOINT = `http://192.168.1.117:4000`;
const socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

export const SocketContext = createContext(socket);