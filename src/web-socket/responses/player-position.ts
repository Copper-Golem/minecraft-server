// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import {
  SocketResponse,
  ContextObject,
} from './response';
import { Server } from '../../server';


export const TYPE = 'player-position';

/**
 * Returns position of a player back to discord bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {string} player Name of the player.
 */
const callback = async (
  server: Server,
  minecraftServer: ScriptServer, 
  socketConnection: connection, 
  context: ContextObject,
  player: string): Promise<void> => {
  const type = 'id' in context ? context.id : TYPE;
  
  if (await minecraftServer.rconConnection.util.isOnline(player)) {
    const data = await minecraftServer.rconConnection.util.getLocation(player);

    return socketConnection.send(JSON.stringify({
      type,
      player,
      online: true,
      location: data,
      context,
    }));
  }

  return socketConnection.send(JSON.stringify({
    type,
    player,
    online: false,
    location: null,
    context,
  }));
};

export const PlayerPosition = new SocketResponse(TYPE, callback);