// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import {
  SocketResponse,
  ContextObject,
} from './response';
import { Server } from '../../server';

export const TYPE = 'command';

/**
 * Runs a command string on the server terminal.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {Array<any>} args Command as string to be run.
 */
const callback = async (
  server: Server,
  minecraftServer: ScriptServer,
  socketConnection: connection,
  context: ContextObject,
  command: string): Promise<void> => {
  minecraftServer.javaServer.send(command);
};

export const Command = new SocketResponse(TYPE, callback);
