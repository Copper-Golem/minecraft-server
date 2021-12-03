// Packages
import { ScriptServer } from '@scriptserver/core';
import { useEssentials } from '@scriptserver/essentials';
import { useEvent } from '@scriptserver/event';
import { useUtil } from '@scriptserver/util';
import { useCommand } from '@scriptserver/command';

// Local Imports
import {
  MINECRAFT_ARGS,
  RCON_PASSWORD,
  RCON_PORT,
  SERVER_JAR_DIR,
  SERVER_JAR_NAME,
} from '../config';

/**
 * Generates a ScriptServer instance.
 *
 * @returns {ScriptServer} New server
 */
export const generateMinecraftServer = () => {
  const server = new ScriptServer({
    javaServer: {
      path: SERVER_JAR_DIR,
      jar: SERVER_JAR_NAME,
      args: MINECRAFT_ARGS,
    },
    rconConnection: {
      host: 'localhost',
      port: parseInt(RCON_PORT as string, 10),
      password: RCON_PASSWORD,
    },
    essentials: {
      starterKit: {
        enabled: false,
      },
      home: {
        enabled: false,
      },
      warp: {
        enabled: false,
      },
      tpa: false,
      back: false,
      day: {
        enabled: false,
      },
      night: {
        enabled: false,
      },
      weather: {
        enabled: false,
      },
    },
  });

  useEssentials(server);
  useEvent(server.javaServer);
  useCommand(server.javaServer);
  useUtil(server.rconConnection);

  return server;
};
