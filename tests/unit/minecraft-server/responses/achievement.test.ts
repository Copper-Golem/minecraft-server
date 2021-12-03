// Local Imports
import {
  Achievement,
  AchievementEvent,
  TYPE,
} from '../../../../src/minecraft-server/responses/achievement';
import { MockMinecraftServer } from '../../../utils/mock-minecraft-server';
import { MockConnection } from '../../../utils/mock-web-socket-server';

const ACHIEVEMENT_EVENT: AchievementEvent = {
  player: 'andyruwruw',
  achievement: 'killWither',
};

/**
 * A test suite for the web-socket generator.
 */
describe('Achievement Event', () => {
  let mockConnection: MockConnection;

  /**
   * Runs before all tests in test suite.
   */
  beforeAll(async () => {
    mockConnection = new MockConnection();
  });

  /**
   * Runs after each tests in test suite.
   */
  afterEach(async () => {
    // Clears mock counts.
    jest.clearAllMocks();
  });

  it('should have a callback function', async () => {
    expect(typeof(Achievement.callback)).toBe('function');
  });

  describe('execute()', () => {
    it('should send achievement to discord bot', async () => {
      await Achievement.execute(new MockMinecraftServer(), mockConnection, [ ACHIEVEMENT_EVENT ]);

      expect(mockConnection.send).toHaveBeenCalledWith(JSON.stringify({
        type: TYPE,
        player: ACHIEVEMENT_EVENT.player,
        achievement: ACHIEVEMENT_EVENT.achievement,
      }));
    });
  });
});
