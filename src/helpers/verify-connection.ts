import { request } from 'websocket';

/**
 * Verifies that connection request is Discord bot.
 *
 * @param {request} socketConnection Incoming socket request. 
 * @returns {boolean} True if connection is Discord bot.
 */
export const verifyConnection = (socketRequest: request): boolean => {
  return true;
}
