// Packages
import {
  connection,
  IUtf8Message,
  Message,
  request,
  server as WebSocketServer,
} from 'websocket';
import { ScriptServer } from '@scriptserver/core';

// Local Imports
import {
  Achievement,
  AchievementEvent,
  Chat,
  ChatEvent, 
  Login,
  LoginEvent,
  Logout,
  LogoutEvent,
} from './minecraft-server/responses';
import {
  CONSOLE_DEFAULT_PREFIX,
  EULA_CONSOLE_REGEX,
} from './config';
import SocketResponse, { Responses } from './web-socket/responses';
import { generateMinecraftServer } from './minecraft-server';
import { generateWebSocketServer } from './web-socket/index';
import { autoConfigureServer } from './utils/auto-configure-server';

export interface ServerConfig {
  minecraftServer?: any,
  webSocketServer?: any,
  webSocketPort?: number,
}

/**
 * Maintains the minecraft and websocket server instances and their interactions.
 */
export class Server {
  /**
   * Configuration for server instances, mostly used for testing purposes. 
   */
  config: ServerConfig;

  /**
   * Whether the server is ready to start.
   */
  ready = false;

  /**
   * Internal minecraft server.
   */
  minecraftServer: ScriptServer | null;

  /**
   * Internal websocket server.
   */
  websocket: WebSocketServer | null;

  /**
   * Connection with Discord bot.
   */
  socketConnection?: connection;

  /**
   * Whether server stop was scheduled for restart.
   */
  scheduledRestart: boolean = false;

  /**
   * Starts internal servers and event listeners.
   *
   * @param {ServerConfig} config Configuration for server instances, mostly used for testing purposes. 
   */
  constructor(config: ServerConfig = {}) {
    this.config = config;
    this.minecraftServer = null;
    this.websocket = null;

    this.createServers();
  }

  /**
   * Creates internal servers and sets listeners when finished.
   * 
   * @param {ServerConfig} config Configuration for server instances, mostly used for testing purposes. 
   */
  async createServers(): Promise<void> {
    await this.createMinecraftServer();
    this.websocket = 'webSocketServer' in this.config ? this.config.webSocketServer : await generateWebSocketServer('webSocketPort' in this.config ? this.config.webSocketPort : undefined);
    
    this.assignListeners();
  }

  /**
   * Creates internal minecraft server.
   */
  async createMinecraftServer(): Promise<void> {
    this.minecraftServer = 'minecraftServer' in this.config ? this.config.minecraftServer : await generateMinecraftServer();
  }

  /**
   * Sets event listeners for internal servers.
   */
  assignListeners(): void {
    // Adding websocket event listeners.
    (this.websocket as WebSocketServer).on('request', (socketRequest: request) => this.handleRequest(socketRequest));
    
    // Adding minecraft event listeners.
    (this.minecraftServer as ScriptServer).javaServer.on('stop', () => this.handleStop());
    (this.minecraftServer as ScriptServer).javaServer.on('login', (event: LoginEvent) => this.handleLogin(event));
    (this.minecraftServer as ScriptServer).javaServer.on('logout', (event: LogoutEvent) => this.handleLogout(event));
    (this.minecraftServer as ScriptServer).javaServer.on('chat', (event: ChatEvent) => this.handleChat(event));
    (this.minecraftServer as ScriptServer).javaServer.on('achievement', (event: AchievementEvent) => this.handleAchievement(event));
    (this.minecraftServer as ScriptServer).javaServer.on('console', (message: string) => this.handleConsole(message));

    this.start();
    this.ready = true;
  }

  /**
   * Handles the server stopping.
   */
  handleStop(): void {
    if (this.scheduledRestart) {
      this.scheduledRestart = false;

      this.createMinecraftServer();
      this.assignListeners();
    }
  }

  /**
   * Starts internal minecraft server.
   */
  start(): void {
    (this.minecraftServer as ScriptServer).start();
  }

  /**
   * Stops internal minecraft server.
   */
  stop(): void {
    (this.minecraftServer as ScriptServer).stop();
  }

  /**
   * Restarts the internal minecraft server.
   */
  restart(): void {
    this.scheduledRestart = true;
    this.stop();
  }

  /**
   * Handles incoming websocket connection requests.
   *
   * @param {request} request Websocket request.
   */

  handleRequest(socketRequest: request): void {
    this.socketConnection = socketRequest.accept(undefined, socketRequest.origin);

    this.socketConnection.on('message', (message: Message) => this.handleMessage(message));
  
    this.socketConnection.on('close', (code: number, description: string) =>  this.handleClose(code, description));
  }

  /**
   * Handles websocket messages.
   *
   * @param message 
   */
  handleMessage = (message: Message): void => {
    try {
      const data = JSON.parse((message as IUtf8Message).utf8Data);
      const responses = Responses();

      if (data.type in responses) {
        const messageType: SocketResponse = responses[data.type];
        messageType.execute(
          this,
          (this.minecraftServer as ScriptServer),
          this.socketConnection as connection,
          data.context,
          data.args,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles the Java server's output.
   *
   * @param {string} message Message in question.
   */
  handleConsole(message: string): void {
    if (message.match(EULA_CONSOLE_REGEX) !== null) {
      autoConfigureServer(this);
    }
  }

  /**
   * Handles player login event from the minecraft server.
   *
   * @param {LoginEvent} event The login event.
   */
  handleLogin(event: LoginEvent): void {
    if (this.socketConnection) {
      Login.execute((this.minecraftServer as ScriptServer), this.socketConnection as connection, [ event ]);
    }
  }

  /**
   * Handles player logout event from the minecraft server.
   *
   * @param {LogoutEvent} event The logout event.
   */
  handleLogout(event: LogoutEvent): void {
    if (this.socketConnection) {
      Logout.execute((this.minecraftServer as ScriptServer), this.socketConnection as connection, [ event ]);
    }
  }

  /**
   * Handles player chat event from the minecraft server.
   *
   * @param {ChatEvent} event The chat event.
   */
  handleChat(event: ChatEvent): void {
    if (this.socketConnection) {
      Chat.execute((this.minecraftServer as ScriptServer), this.socketConnection as connection, [ event ]);
    }
  }

  /**
   * Handles player achievement event from the minecraft server.
   *
   * @param {AchievementEvent} event The achievement event.
   */
  handleAchievement(event: AchievementEvent): void {
    if (this.socketConnection) {
      Achievement.execute((this.minecraftServer as ScriptServer), this.socketConnection as connection, [ event ]);
    }
  }

  /**
   * Handles the close of a websocket connection.
   * This event means the discord bot has gone offline while a server remains up. This would be catastrophic?
   *
   * @param {number} reasonCode Reason for close.
   * @param {string} description Reason for close.
   */
  handleClose(reasonCode: number, description: string): void {
    console.log(CONSOLE_DEFAULT_PREFIX, `Connection Error ${reasonCode}: Connection with Discord Bot has closed unexpectedly, ${description}`);
  }
}
