// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import {
  SocketResponse,
  ContextObject,
} from './response';
import { Server } from '../../server';

export const TYPE = 'status';

/**
 * Returns status of the server back to discord bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 */
const callback = async (
  server: Server,
  minecraftServer: ScriptServer,
  socketConnection: connection,
  context: ContextObject): Promise<void> => {
  const data = await minecraftServer.rconConnection.util.getOnline();
  const type = 'id' in context ? context.id : TYPE;
  
  if (socketConnection) {
    await socketConnection.send(JSON.stringify({
      type,
      online: data.online,
      players: data.players,
      context,
    }));
  }
};

export const Status = new SocketResponse(TYPE, callback);
