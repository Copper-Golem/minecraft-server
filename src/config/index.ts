// Packages
import dotenv from 'dotenv';

// Local Imports
import { rconPassword } from '../helpers/rcon-password';

dotenv.config();

/**
 * Separates server consoles from Minecraft server.
 */
export const CONSOLE_DEFAULT_PREFIX = '[CopperBot Server]';

// Environmental Variables
export const RCON_PASSWORD = process.env.RCON_PASSWORD || rconPassword();
export const RCON_PORT = process.env.RCON_PORT || 25575;
export const SERVER_JAR_DIR = process.env.SERVER_JAR_DIR || '.';
export const SERVER_JAR_NAME = process.env.SERVER_JAR_NAME || 'server.jar';
export const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3000;

export const EULA_CONSOLE_REGEX = /Go to eula.txt for more info/;

export const SERVER_PROPERTY_RCON_REGEX = /enable-rcon=[a-yA-Y]*$/gim;
export const SERVER_PROPERTY_RCON_PORT_REGEX = /rcon.port=[0-9]*$/gim;
export const SERVER_PROPERTY_RCON_PASSWORD_REGEX = /rcon.password=[a-yA-Y0-9]*$/gim;
export const SERVER_PROPERTY_RCON_BROADCAST_REGEX = /broadcast-rcon-to-ops=[a-yA-Y]*$/gim;
export const SERVER_PROPERTY_WHITE_LIST_REGEX = /white-list=[a-yA-Y]*$/gim;
export const SERVER_PROPERTY_ENFORCE_WHITE_LIST_REGEX = /enforce-whitelist=[a-yA-Y]*$/gim;

/**
 * Java Minecraft arguments for server start.
 */
export const MINECRAFT_ARGS = [
  '-Xmx10000M',
  '-Xms1000M',
  '-XX:+UseG1GC',
  '-XX:+ParallelRefProcEnabled',
  '-XX:MaxGCPauseMillis=200',
  '-XX:+UnlockExperimentalVMOptions',
  '-XX:+DisableExplicitGC',
  '-XX:+AlwaysPreTouch',
  '-XX:G1NewSizePercent=40',
  '-XX:G1MaxNewSizePercent=50',
  '-XX:G1HeapRegionSize=16M',
  '-XX:G1ReservePercent=15',
  '-XX:G1HeapWastePercent=5',
  '-XX:G1MixedGCCountTarget=4',
  '-XX:InitiatingHeapOccupancyPercent=20',
  '-XX:G1MixedGCLiveThresholdPercent=90',
  '-XX:G1RSetUpdatingPauseTimePercent=5',
  '-XX:SurvivorRatio=32',
  '-XX:+PerfDisableSharedMem',
  '-XX:MaxTenuringThreshold=1',
];
