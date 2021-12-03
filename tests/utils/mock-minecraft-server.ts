// Packages
import {
  Config,
  DeepPartial,
  JavaServer,
  JavaServerConfig,
  RconConnection,
  ScriptServer,
} from '@scriptserver/core';
import EventsEmitter from 'events';
import defaultsDeep from 'lodash.defaultsdeep';

const DEFAULT_JAVA_SERVER_CONFIG: JavaServerConfig = {
  jar: 'server.jar',
  args: ['-Xmx1024M', '-Xms1024M'],
  path: '.',
  pipeStdout: true,
  pipeStdin: true,
  flavorSpecific: {
    default: {
      startedRegExp: /^\[.+?\]: Done/,
      stoppedRegExp: /^\[.+?\]: ThreadedAnvilChunkStorage: All dimensions are saved$/,
    },
  },
};

/**
 * Mocks ScriptServer.RconConnection class with spy functions.
 */
export class MockRconConnection extends RconConnection {
  constructor(config: DeepPartial<Config> = {}) {
    super(config);
  }

  public connect = jest.fn();

  public disconnect = jest.fn();

  public send = jest.fn();

  public util = {
    isOp: jest.fn(),
    isOnline: jest.fn(),
    tellRaw: jest.fn(),
    getEntityData: jest.fn(),
    getDimension: jest.fn(),
    getLocation: jest.fn(),
    getOnline: jest.fn(),
    teleport: jest.fn(),
    wait: jest.fn(),
  };
}

/**
 * Mocks ScriptServer.JavaServer class with spy functions.
 */
export class MockJavaServer extends EventsEmitter implements JavaServer  {
  public config: Config;

  constructor(config: DeepPartial<Config> = {}) {
    super();

    this.config = defaultsDeep(config, { javaServer: DEFAULT_JAVA_SERVER_CONFIG });
  }

  public start = jest.fn();

  public stop = jest.fn();

  public send = jest.fn();

  public command = jest.fn();
}

/**
 * Mocks ScriptServer class with spy functions.
 */
export class MockMinecraftServer implements ScriptServer {
  public config: Config;

  public javaServer: JavaServer;

  public rconConnection: RconConnection;

  constructor(config: DeepPartial<Config> = {}) {
    this.config = config as Config;

    this.javaServer = new MockJavaServer(config);
    this.rconConnection = new MockRconConnection(config);
  }

  public start = jest.fn();

  public stop = jest.fn();
}
