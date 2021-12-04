// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import {
  stopTrackingPlayer,
  getStartTime,
} from '../helpers/active-players';
import { MinecraftResponse } from './response';
import { PlayerEvent } from './index';

export const TYPE = 'logout';

export interface LogoutEvent extends PlayerEvent {
  reason: string;
}

/**
 * Returns time played back to discord bot along with player who left.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {LogoutEvent} event Logout event
 */
const callback = async (
  minecraftServer: ScriptServer,
  socketConnection: connection,
  event: LogoutEvent) => {
  const start = getStartTime(event.player);
  const time = stopTrackingPlayer(event.player);

  if (socketConnection) {
    await socketConnection.send(JSON.stringify({
      type: TYPE,
      player: event.player,
      reason: event.reason,
      timeSpent: time,
      start: start,
    }));
  }
};

export const Logout = new MinecraftResponse(callback);
