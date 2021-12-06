// Packages
import http from 'http';
import { server as WebSocketServer } from 'websocket';

/**
 * Starts server and keeps checking if it is ready.
 *
 * @param {http.Server | null} server Http server for websocket server.
 * @param {number} port Desired port the server should run on.
 * @returns {WebSocketServer} The server resulting.
 */
export const waitForServerToStart = async (server: http.Server | null, port: number): Promise<WebSocketServer> => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      if (server === null) {
        // Creates http server for websocket.
        server = http.createServer();

        // Start the server.
        server.listen(port, () => {
          console.log(`Websocket server listening on port ${port}`);

          // Creates an instance of a websocket server for two way communication.
          const webSocketServer = new WebSocketServer({
            httpServer: server as http.Server,
            autoAcceptConnections: false,
          });

          resolve(webSocketServer);
        });
      }

      waitForServerToStart(server, port);
    }, 5);
  }); 
};
