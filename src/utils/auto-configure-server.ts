// Packages
import { Server } from '../server';
import fs from 'fs';
import path from 'path';

// Local Imports
import {
  CONSOLE_DEFAULT_PREFIX,
  RCON_PASSWORD,
  RCON_PORT,
} from '../config';

/**
 * Encoding for fs.
 */
const ENCODING = 'utf-8';

/**
 * Automatically approves EULA.
 */
const autoEula = async () => {
  const pathToEula = path.join(__dirname, '../../../eula.txt');

  const data = await fs.readFileSync(pathToEula, ENCODING);
  const approved = data.replace(/false/gim, 'TRUE');
  await fs.writeFileSync(pathToEula, approved, ENCODING);

  console.log(CONSOLE_DEFAULT_PREFIX, 'EULA approved, you\'re welcome!');
};

/**
 * Automatically sets required server properties.
 */
const autoServerProperties = async () => {
  const pathToServerProperties = path.join(__dirname, '../../../server.properties');

  const data = await fs.readFileSync(pathToServerProperties, ENCODING);

  let fixed = data.replace(/enable-rcon=[a-yA-Y]*$/gim, 'enable-rcon=true');
  fixed = fixed.replace(/rcon.port=[0-9]*$/gim, `rcon.port=${RCON_PORT}`);
  fixed = fixed.replace(/rcon.password=[a-yA-Y0-9]*$/gim, `rcon.password=${RCON_PASSWORD}`);
  fixed = fixed.replace(/broadcast-rcon-to-ops=[a-yA-Y]*$/gim, 'broadcast-rcon-to-ops=false');
  fixed = fixed.replace(/white-list=[a-yA-Y]*$/gim, 'white-list=true');
  fixed = fixed.replace(/enforce-whitelist=[a-yA-Y]*$/gim, 'enforce-whitelist=true');

  await fs.writeFileSync(pathToServerProperties, fixed, ENCODING);
};

/**
 * Automatically approves EULA and sets server properties.
 *
 * @param {Server} server Instance of the server.
 */
export const autoConfigureServer = async (server: Server) => {
  server.stop();

  await autoEula();
  await autoServerProperties();
    
  console.log(CONSOLE_DEFAULT_PREFIX, 'Restarting the server now.');
  await server.createMinecraftServer();
  server.start();
};
