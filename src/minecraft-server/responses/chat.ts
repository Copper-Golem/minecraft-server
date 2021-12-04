// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { MinecraftResponse } from './response';
import { PlayerEvent } from './index';

export const TYPE = 'chat';

export interface ChatEvent extends PlayerEvent {
  message: string;
}

/**
 * Sends player chat to discord bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {LoginEvent} event Login event
 */
const callback = async (
  minecraftServer: ScriptServer, 
  socketConnection: connection, 
  event: ChatEvent,
) => {
  if (socketConnection) {
    await socketConnection.send(JSON.stringify({
      type: TYPE,
      player: event.player,
      message: event.message,
    }));
  }
};

export const Chat = new MinecraftResponse(callback);
