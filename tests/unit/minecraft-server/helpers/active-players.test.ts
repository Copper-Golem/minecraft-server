// Local Imports
import {
  activePlayers,
  startTrackingPlayer,
  getStartTime,
  stopTrackingPlayer,
  getCurrentPlaytime,
} from '../../../../src/minecraft-server/helpers/active-players';

const USERNAME = 'andyruwruw';

/**
 * A test suite for the web-socket generator.
 */
describe('Active Player Tracker', () => {
  /**
   * Runs after each tests in test suite.
   */
  afterEach(async () => {
    // Clears mock counts.
    jest.clearAllMocks();
  });

  describe('startTrackingPlayer()', () => {
    it('should add username to active players and begin tracking', async () => {
      startTrackingPlayer(USERNAME);

      expect(USERNAME in activePlayers).toBe(true);
      expect(typeof(activePlayers[USERNAME])).toBe('number');
    });

    it('should override start time if already exists', async () => {
      const time = startTrackingPlayer(USERNAME);

      setTimeout(() => {
        startTrackingPlayer(USERNAME);

        expect(time === activePlayers[USERNAME]).toBe(false);
      }, 2);
    });
  });

  describe('getStartTime()', () => {
    it('should return start time by username', async () => {
      const time = startTrackingPlayer(USERNAME);

      const newTime = getStartTime(USERNAME);

      expect(newTime == time).toBe(true);
    });
  });

  describe('stopTrackingPlayer()', () => {
    it('should remove tracking for username', async () => {
      startTrackingPlayer(USERNAME);

      expect(USERNAME in activePlayers).toBe(true);

      stopTrackingPlayer(USERNAME);

      expect(USERNAME in activePlayers).toBe(false);
    });

    it('should return time elapsed for username', async () => {
      startTrackingPlayer(USERNAME);

      expect(USERNAME in activePlayers).toBe(true);

      const time = stopTrackingPlayer(USERNAME);

      expect(typeof(time)).toBe('number');
    });
  });

  describe('getCurrentPlaytime()', () => {
    it('should send achievement to discord bot', async () => {
      startTrackingPlayer(USERNAME);

      expect(USERNAME in activePlayers).toBe(true);

      const time = getCurrentPlaytime(USERNAME);

      expect(typeof(time)).toBe('number');
    });
  });
});
