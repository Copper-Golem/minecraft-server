// Local Imports
import {
  Command,
  TYPE,
} from '../../../../src/websocket/responses/command';
import { MockServer } from '../../../utils/mock-server';
import { MockMinecraftServer } from '../../../utils/mock-minecraft-server';
import { MockConnection, MockWebSocketServer } from '../../../utils/mock-web-socket-server';
import { ScriptServer } from '@scriptserver/core';

const MINECRAFT_SERVER = new MockMinecraftServer();

const SERVER = new MockServer({
  minecraftServer: MINECRAFT_SERVER,
  webSocketServer: new MockWebSocketServer(),
});

/**
 * A test suite for the web-socket generator.
 */
describe('Command Event', () => {
  /**
   * Runs after each tests in test suite.
   */
  afterEach(async () => {
    // Clears mock counts.
    jest.clearAllMocks();
  });

  it('should have the correct response type', async () => {
    expect(Command.type).toBe(TYPE);
  });

  it('should have a callback function', async () => {
    expect(typeof(Command.callback)).toBe('function');
  });

  describe('isMatch()', () => {
    it('should return true for valid type', async () => {
      expect(Command.isMatch(TYPE)).toBe(true);
    });

    it('should return false for invalid type', async () => {
      expect(Command.isMatch('invalid')).toBe(false);
    });
  });

  describe('execute()', () => {
    it('should send command to java server', async () => {
      const COMMAND = 'say hello';

      await Command.execute(
        SERVER,
        SERVER.minecraftServer as ScriptServer,
        new MockConnection(),
        undefined,
        [ COMMAND ],
      );

      expect((SERVER.minecraftServer as ScriptServer).javaServer.send).toHaveBeenCalledWith(COMMAND);
    });
  });
});
