// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { MinecraftResponse } from './response';

export const TYPE = 'console';

/**
 * Sends console lines to the bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {string} message Console message
 */
const callback = async (
  minecraftServer: ScriptServer, 
  socketConnection: connection, 
  message: string,
) => {
  await socketConnection.send(JSON.stringify({
    type: TYPE,
    message,
  }));
};

export const ConsoleResponse = new MinecraftResponse(callback);
