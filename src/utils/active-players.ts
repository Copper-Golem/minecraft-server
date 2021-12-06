// Initialize dictionary of active players
export let activePlayers: {
  [username: string]: number,
} = {};

/**
 * Tracks the time a player logs in.
 *
 * @param {string} username Player's username.
 */ 
export const startTrackingPlayer = (username: string): number => { 
  activePlayers[username] = Date.now();

  return activePlayers[username];
};

/**
 * Returns the start time of the players time on the server.
 *
 * @param {string} username Player's username.
 * @returns {number} Start time of the players time on the server.
 */
export const getStartTime = (username: string) => {
  if (username in activePlayers) {
    return activePlayers[username];
  }
  return 0;
};

/**
 * Removes a player from active players and records their time.
 *
 * @param {string} username Player's username.
 * @returns {number} The time the player was online.
 */
export const stopTrackingPlayer = (username: string) => {
  if (username in activePlayers){
    const startTime = activePlayers[username];
    delete activePlayers[username];

    return Date.now() - startTime;
  }
  return 0;
};

/**
 * Get current playtime of user without stopping tracking them. 
 *
 * @param {string} username Player's username.
 * @returns {number} The time the player was online.
 */
export const getCurrentPlaytime = (username: string) => {
  return Date.now() - activePlayers[username];
};

/**
 * Clears all current tracked players.
 */
export const clearAllTrackings = () => {
  activePlayers = {};
};
