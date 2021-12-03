// Local Imports
import {
  Status,
  TYPE,
} from '../../../../src/web-socket/responses/status';
import {
  MockMinecraftServer,
  MockRconConnection,
} from '../../../utils/mock-minecraft-server';
import {
  MockWebSocketServer,
  MockConnection,
} from '../../../utils/mock-web-socket-server';
import { MockServer } from '../../../utils/mock-server';

const ONLINE_DATA = {
  type: TYPE,
  online: 2,
  players: [ 'andyruwruw', 'andyruwruw2'],
};

/**
 * A test suite for the web-socket generator.
 */
describe('Status Event', () => {
  let mockServer: MockServer;

  let mockConnection: MockConnection;

  /**
   * Runs before all tests in test suite.
   */
  beforeAll(async () => {
    mockServer = new MockServer({
      minecraftServer: new MockMinecraftServer(),
      webSocketServer: new MockWebSocketServer(),
    });
    mockConnection = new MockConnection();
  });

  /**
   * Runs after each tests in test suite.
   */
  afterEach(async () => {
    // Clears mock counts.
    jest.clearAllMocks();
  });

  it('should have the correct response type', async () => {
    expect(Status.type).toBe(TYPE);
  });

  it('should have a callback function', async () => {
    expect(typeof(Status.callback)).toBe('function');
  });

  describe('isMatch()', () => {
    it('should return true for valid type', async () => {
      expect(Status.isMatch(TYPE)).toBe(true);
    });

    it('should return false for invalid type', async () => {
      expect(Status.isMatch('invalid')).toBe(false);
    });
  });

  describe('execute()', () => {
    it('should check with java server for online status', async () => {
      (mockServer.minecraftServer.rconConnection as MockRconConnection).util.getOnline.mockReturnValueOnce(ONLINE_DATA);
  
      await Status.execute(
        mockServer,
        mockServer.minecraftServer,
        mockConnection,
      );

      expect(mockServer.minecraftServer.rconConnection.util.getOnline).toHaveBeenCalled();
    });

    it('should send online data back to socket', async () => {
      (mockServer.minecraftServer.rconConnection as MockRconConnection).util.getOnline.mockReturnValueOnce(ONLINE_DATA);

      await Status.execute(
        mockServer,
        mockServer.minecraftServer,
        mockConnection,
      );

      expect(mockConnection.send).toHaveBeenCalledWith(JSON.stringify({
        type: TYPE,
        online: ONLINE_DATA.online,
        players: ONLINE_DATA.players,
      }));
    });
  });
});
