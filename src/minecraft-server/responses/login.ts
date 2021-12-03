// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { MinecraftResponse } from './response';
import { startTrackingPlayer } from '../helpers/active-players';
import { PlayerEvent } from './index';

export const TYPE = 'login';

export interface LoginEvent extends PlayerEvent {
  ip: string;
}

/**
 * Tracks player's time on server and tells discord bot the player is online.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {LoginEvent} event Login event
 */
const callback = async (
  minecraftServer: ScriptServer,
  socketConnection: connection,
  event: LoginEvent) => {
  startTrackingPlayer(event.player);

  await socketConnection.send(JSON.stringify({
    type: TYPE,
    player: event.player,
  }));
};

export const Login = new MinecraftResponse(callback);
