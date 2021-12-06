// Packages
import {
  connection,
  Message,
  request,
  server as WebSocketServer,
} from 'websocket';

// Local Imports
import {
  generateWebSocketServer,
  verifyConnection,
} from '../helpers';

/**
 * Maintains and manages websocket connection.
 */
export class WebsocketServer {
  /**
   * Internal websocket server.
   */
  websocket?: WebSocketServer;

  /**
   * Connection with Discord bot.
   */
  socketConnection?: connection;

  /**
   * Messages failed to be sent.
   */
  pendingMessages: Message[] = [];

  /**
   * Starts internal servers and event listeners.
   *
   * @param {WebSocketServer | null} websocket Optional websocket server instance override.
   */
  constructor(websocket: WebSocketServer | null) {
    this.createServer(websocket);
  }

  /**
   * Creates internal servers and sets listeners when finished.
   * 
   * @param {WebSocketServer | null} websocket Optional websocket server instance override.
   */
  async createServer(websocket: WebSocketServer | null): Promise<void> {
    this.websocket = websocket ? websocket : await generateWebSocketServer();

    // Adding websocket event listeners.
    (this.websocket as WebSocketServer).on('request', (socketRequest: request) => this.handleRequest(socketRequest));
  }

  /**
   * Handles an incoming connection request by verifying the connection.
   *
   * @param {request} socketRequest Incoming connection request.
   */
  handleRequest(socketRequest: request): void {
    if (!verifyConnection(socketRequest)) {
      socketRequest.reject();
    }

    this.socketConnection = socketRequest.accept(undefined, socketRequest.origin);

    this.socketConnection.on('message', (message: Message) => this.handleMessage(message));
  
    this.socketConnection.on('close', (code: number, description: string) =>  this.handleClose(code, description));
  }

  /**
   * Handles an incoming message from a verified connection.
   *
   * @param {Message} message Incoming message.
   */
  handleMessage(message: Message): void {
  }

  /**
   * Handles a connection close.
   *
   * @param {number} code Status code of close. 
   * @param {string} description Description of reason for close.
   */
  handleClose(code: number, description: string): void {
  }
}
