// Local Imports
import {
  Server,
  ServerConfig,
} from '../../src/server';

export class MockServer extends Server {
  constructor(config: ServerConfig) {
    super(config);
  }
}