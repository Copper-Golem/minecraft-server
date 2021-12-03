// Local Imports
import {
  Logout,
  LogoutEvent,
  TYPE,
} from '../../../../src/minecraft-server/responses/logout';
import { MockMinecraftServer } from '../../../utils/mock-minecraft-server';
import { MockConnection } from '../../../utils/mock-web-socket-server';

const LOGOUT_EVENT: LogoutEvent = {
  player: 'andyruwruw',
  reason: 'died at his computer from overplaying',
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
    expect(typeof(Logout.callback)).toBe('function');
  });

  describe('execute()', () => {
    it('should send achievement to discord bot', async () => {
      await Logout.execute(new MockMinecraftServer(), mockConnection, [ LOGOUT_EVENT ]);

      expect(mockConnection.send).toHaveBeenCalledWith(JSON.stringify({
        type: TYPE,
        player: LOGOUT_EVENT.player,
        reason: LOGOUT_EVENT.reason,
        timeSpent: 0,
        start: 0,
      }));
    });
  });
});
