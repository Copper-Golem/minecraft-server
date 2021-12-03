/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  connection,
  frame,
  IBufferList,
  IConfig,
  ICookie,
  IExtension,
  IServerConfig,
  request,
  server as WebSocketServer,
} from 'websocket';
import {
  IncomingMessage,
  Server as HttpServer,
} from 'http';
import { Socket } from 'net';
import { Url } from 'url';
import EventEmitter from 'events';

/**
 * Mocks websocket server class.
 */
export class MockWebSocketServer extends EventEmitter implements WebSocketServer {
  config?: IServerConfig | undefined;

  connections: connection[];

  pendingRequests: request[];

  constructor() {
    super();

    this.connections = [];
    this.pendingRequests = [];
  }
  
  broadcast = jest.fn();

  broadcastBytes = jest.fn();

  broadcastUTF = jest.fn();

  mount = jest.fn();

  unmount = jest.fn();

  closeAllConnections = jest.fn();

  shutDown = jest.fn();

  handleUpgrade = jest.fn();

  handleRequestAccepted = jest.fn();

  handleConnectionClose = jest.fn();

  handleRequestResolved = jest.fn();
}

/**
 * Mocks connection class.
 */
export class MockConnection extends EventEmitter implements connection {
  closeDescription = '';

  closeReasonCode = 0;

  protocol = '';

  config: IConfig = {};

  socket: Socket = new Socket();

  maskOutgoingPackets = false;

  maskBytes: Buffer = new Buffer('');

  frameHeader: Buffer = new Buffer('');

  bufferList: IBufferList = {
    encoding: '',
    length: 0,
    write: jest.fn(),
    end: jest.fn(),
    push: jest.fn(),
    forEach: jest.fn(),
    join: jest.fn(),
    joinInto: jest.fn(),
    advance: jest.fn(),
    take: jest.fn(),
    toString: jest.fn(),
    on: jest.fn(),
    addListener: jest.fn(),
    once: jest.fn(),
    removeListener: jest.fn(),
    off: jest.fn(),
    removeAllListeners: jest.fn(),
    listeners: jest.fn(),
    setMaxListeners: jest.fn(),
    getMaxListeners: jest.fn(),
    rawListeners: jest.fn(),
    emit: jest.fn(),
    listenerCount: jest.fn(),
    prependListener: jest.fn(),
    prependOnceListener: jest.fn(),
    eventNames: jest.fn(),
  };

  currentFrame: frame = {
    fin: false,
    rsv1: false,
    rsv2: false,
    rsv3: false,
    mask: 0,
    opcode: 0,
    length: 0,
    binaryPayload: new Buffer(''),
    maskBytes: new Buffer(''),
    frameHeader: new Buffer(''),
    config: {
      maxReceivedFrameSize: 0,
    },
    maxReceivedFrameSize: 0,
    protocolError: false,
    dropReason: '',
    frameTooLarge: false,
    invalidCloseFrameLength: false,
    parseState: 0,
    closeStatus: 0,
    addData: jest.fn(),
    throwAwayPayload: jest.fn(),
    toBuffer: jest.fn(),
    toString: jest.fn(),
  };

  fragmentationSize = 0;

  frameQueue: frame[] = [];

  state = '';

  waitingForCloseResponse = false;

  receivedEnd = false;

  closeTimeout = 0;

  assembleFragments = 0;

  maxReceivedMessageSize = 0;

  outputBufferFull = false;

  inputPaused = false;

  bytesWaitingToFlush = 0;

  socketHadError = false;

  extensions: IExtension[] = [];

  remoteAddress = '';

  webSocketVersion = 0;

  connected = false;

  _pingListenerCount = 0;

  close = jest.fn();

  drop = jest.fn();

  sendUTF = jest.fn();

  sendBytes = jest.fn();

  send = jest.fn();

  ping = jest.fn();

  pong = jest.fn();

  sendFrame = jest.fn();

  setKeepaliveTimer = jest.fn();

  clearKeepaliveTimer = jest.fn();

  handleKeepaliveTimer = jest.fn();

  setGracePeriodTimer = jest.fn();

  clearGracePeriodTimer = jest.fn();

  handleGracePeriodTimer = jest.fn();

  handleSocketData = jest.fn();

  processReceivedData = jest.fn();

  handleSocketError = jest.fn();

  handleSocketEnd = jest.fn();

  handleSocketClose = jest.fn();

  handleSocketDrain = jest.fn();

  handleSocketPause = jest.fn();

  handleSocketResume = jest.fn();

  pause = jest.fn();

  resume = jest.fn();

  setCloseTimer = jest.fn();

  clearCloseTimer = jest.fn();

  handleCloseTimer = jest.fn();

  processFrame = jest.fn();

  fragmentAndSend = jest.fn();

  sendCloseFrame = jest.fn();

  _addSocketEventListeners = jest.fn();
}

/**
 * Mocks request class.
 */
export class MockRequest implements request {
  httpRequest: IncomingMessage = new IncomingMessage(new Socket());

  host = 'localhost';

  resource = '';

  key = '';

  resourceURL: Url = {
    auth: null,
    hash: null,
    host: null,
    hostname: null,
    href: '',
    path: null,
    pathname: null,
    protocol: null,
    search: null,
    slashes: null,
    port: null,
    query: null,
  };
  
  remoteAddress = '';

  remoteAddresses: string[] = [];

  origin = '';

  webSocketVersion = 0;

  requestedExtensions: any[] = [];

  cookies: ICookie[] = [];

  socket: Socket = new Socket();

  requestedProtocols: string[] = [];

  protocolFullCaseMap: { [key: string]: string; } = {};

  serverConfig: IServerConfig = {
    httpServer: new HttpServer(),
  };

  _resolved = false;

  _socketIsClosing = false;

  accept = jest.fn((
    acceptedProtocol?: string,
    allowedOrigin?: string,
    cookies?: ICookie[]) => {
    return new MockConnection();
  });

  reject = jest.fn();

  on = jest.fn();

  addListener = jest.fn();

  readHandshake = jest.fn();

  parseExtensions = jest.fn();

  parseCookies = jest.fn();

  _handleSocketCloseBeforeAccept = jest.fn();

  _removeSocketCloseListeners = jest.fn();

  _verifyResolution = jest.fn();

  once = jest.fn();

  removeListener = jest.fn();

  off = jest.fn();

  removeAllListeners = jest.fn();

  setMaxListeners = jest.fn();

  getMaxListeners = jest.fn();

  listeners = jest.fn();

  rawListeners = jest.fn();

  emit = jest.fn();

  listenerCount = jest.fn();

  prependListener = jest.fn();

  prependOnceListener = jest.fn();

  eventNames = jest.fn();
}
