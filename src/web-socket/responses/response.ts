// Packages
import { ScriptServer } from '@scriptserver/core';
import { Server } from 'src/server';
import { connection } from 'websocket';

export interface ContextObject {
  id?: string;
  guildId?: string;
  userId?: string;
  isDm?: boolean;
  channelId?: string;
  args?: Record<string, any>;
}

/**
 * Defines a response.
 */
export class SocketResponse {
  type: string;

  callback: Function;

  constructor(
    type: string,
    callback: Function,
  ) {
    this.type = type;
    this.callback = callback;
  }

  /**
   * Whether a message matches this response type.
   *
   * @param {string} type Type from incoming message.
   * @returns Whether a message matches this response type.
   */
  isMatch(type: string): boolean {
    return this.type === type;
  }

  /**
   * Executes the callback with the given arguments.
   *
   * @param {string[]} args Arguments provided in message.
   * @returns Promise of callback functions.
   */
  async execute(
    server: Server,
    mincraftServer: ScriptServer,
    socketConnection: connection,
    context: ContextObject = {},
    args: string[] = [],
  ): Promise<void> {
    return this.callback(
      server,
      mincraftServer,
      socketConnection,
      context,
      ...args,
    );
  }
}