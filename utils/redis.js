import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  /**
   * Create a new RedisClient instance
   */
  constructor() {
    this.client = createClient();
    this.isClientConnect = true;
    this.client.on('error', (err) => {
      console.error('Redis failed to connect', err.message);
      this.isClientConnect = false;
    });
    this.client.on('connect', () => {
      this.isClientConnect = true;
    });
  }

  isAlive() {
    return this.isClientConnect;
  }

  async get(key) {
    const getKey = promisify(this.client.get).bind(this.client)(key);
    return getKey;
  }

  async set(key, value, duration) {
    const setKey = await promisify(this.client.setex)
      .bind(this.client)(key, duration, value);
    return setKey;
  }

  async del(key) {
    const delKey = await promisify(this.client.del).bind(this.client)(key);
    return delKey;
  }
}

export const redisClient = new RedisClient();
export default redisClient;
