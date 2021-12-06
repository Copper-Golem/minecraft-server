// Packages
import http from 'http';
import { server as WebSocketServer } from 'websocket';

// Local Imports
import { waitForServerToStart } from './wait-for-server-to-start';
import { WEBSOCKET_PORT } from '../config';

/**
 * Creates and starts a new websocket server.
 *
 * @returns {WebSocketServer}
 */
export const generateWebSocketServer = async (port: number | undefined = undefined): Promise<WebSocketServer> => {
  const server: http.Server | null = null;
  const resultingPort = port != undefined ? port : parseInt(WEBSOCKET_PORT as string, 10);
  
  return waitForServerToStart(server, resultingPort);
};
