// Local Imports
import {
  Chat,
  ChatEvent,
  TYPE,
} from '../../../../src/minecraft-server/responses/chat';
import { MockMinecraftServer } from '../../../utils/mock-minecraft-server';
import { MockConnection } from '../../../utils/mock-web-socket-server';

const CHAT_EVENT: ChatEvent = {
  player: 'andyruwruw',
  message: 'What\'s pogging boys',
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
    expect(typeof(Chat.callback)).toBe('function');
  });

  describe('execute()', () => {
    it('should send achievement to discord bot', async () => {
      await Chat.execute(new MockMinecraftServer(), mockConnection, [ CHAT_EVENT ]);

      expect(mockConnection.send).toHaveBeenCalledWith(JSON.stringify({
        type: TYPE,
        player: CHAT_EVENT.player,
        message: CHAT_EVENT.message,
      }));
    });
  });
});
