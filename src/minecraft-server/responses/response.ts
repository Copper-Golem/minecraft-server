// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

/**
 * Defines a minecraft response.
 */
export class MinecraftResponse {
  callback: Function;

  constructor(callback: Function) {
    this.callback = callback;
  }

  /**
   * Executes the callback with the given arguments.
   *
   * @param {string[]} args Arguments provided in message.
   * @returns Promise of callback functions.
   */
  async execute(
    mincraftServer: ScriptServer,
    socketConnection: connection,
    args: any[] = []): Promise<void> {
    return this.callback(
      mincraftServer,
      socketConnection,
      ...args,
    );
  }
}
