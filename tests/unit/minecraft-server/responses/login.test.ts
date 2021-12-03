// Local Imports
import {
  Login,
  LoginEvent,
  TYPE,
} from '../../../../src/minecraft-server/responses/login';
import { MockMinecraftServer } from '../../../utils/mock-minecraft-server';
import { MockConnection } from '../../../utils/mock-web-socket-server';

const LOGIN_EVENT: LoginEvent = {
  player: 'andyruwruw',
  ip: '127.0. 0.1',
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
    expect(typeof(Login.callback)).toBe('function');
  });

  describe('execute()', () => {
    it('should send achievement to discord bot', async () => {
      await Login.execute(new MockMinecraftServer(), mockConnection, [ LOGIN_EVENT ]);

      expect(mockConnection.send).toHaveBeenCalledWith(JSON.stringify({
        type: TYPE,
        player: LOGIN_EVENT.player,
      }));
    });
  });
});
