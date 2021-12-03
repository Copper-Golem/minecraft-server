// Local Imports
import {
  MockConnection,
  MockRequest,
  MockWebSocketServer,
} from '../utils/mock-web-socket-server';
import { Server } from '../../src/server';
import { MockMinecraftServer } from '../utils/mock-minecraft-server';

/**
 * A test suite for the server class.
 */
describe('Server Class', () => {
  let server: Server;

  /**
   * Runs before all tests in test suite.
   */
  beforeAll(async () => {
    // Creates a server with a mock minecraft server.
    server = new Server({
      minecraftServer: new MockMinecraftServer(),
      webSocketServer: new MockWebSocketServer(),
    });
  });

  /**
   * Runs after all tests in test suite.
   */
  afterAll(async () => {
    // Stops the server.
    server.stop();

    // Clears mock counts.
    jest.clearAllMocks();
  });

  describe('Instantiation', () => {
    it('should instantiate internal servers', () => {
      expect(server.minecraftServer).toBeDefined();
      expect(server.minecraftServer).toBeInstanceOf(MockMinecraftServer);

      expect((server.websocket as MockWebSocketServer)).toBeDefined();
      expect((server.websocket as MockWebSocketServer)).toBeInstanceOf(MockWebSocketServer);
    });
  });

  describe('start()', () => {
    test('should start the minecraft server', () => {
      // Starts the server.
      server.start();

      // Checks the minecraft server state.
      expect((server.minecraftServer as MockMinecraftServer).start.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe('stop()', () => {
    test('should stop the minecraft server', () => {
      // Stops the server.
      server.stop();

      // Checks the minecraft server state.
      expect((server.minecraftServer as MockMinecraftServer).stop.mock.calls.length).toBe(1);
    });
  });

  describe('handleRequest()', () => {
    test('should save socket connection', async () => {
      const request = new MockRequest();
      (server.websocket as MockWebSocketServer).emit('request', request);

      // Checks that connection was made
      expect(request.accept.mock.calls.length).toBe(1);
      expect(server.socketConnection).toBeDefined();
      expect(server.socketConnection).toBeInstanceOf(MockConnection);
    });
  });
});
