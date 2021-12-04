// Packages
import { ScriptServer } from '@scriptserver/core';
import { connection } from 'websocket';

// Local Imports
import { MinecraftResponse } from './response';
import { PlayerEvent } from './index';

export const TYPE = 'achievement';

export interface AchievementEvent extends PlayerEvent {
  achievement: string;
}

/**
 * Sends achievement to discord bot.
 *
 * @param {ScriptServer} minecraftServer Instance of the running minecraft server.
 * @param {connection} socketConnection Connection with discord bot.
 * @param {LoginEvent} event Login event
 */
const callback = async (
  minecraftServer: ScriptServer,
  socketConnection: connection,
  event: AchievementEvent) => {
  if (socketConnection) {
    await socketConnection.send(JSON.stringify({
      type: TYPE,
      player: event.player,
      achievement: event.achievement,
    }));
  }
};

export const Achievement = new MinecraftResponse(callback);
