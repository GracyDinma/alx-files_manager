import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    
    // Promisify the Redis commands for async usage
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setexAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      // Log connection success (optional for debugging)
      console.log('Redis client connected to the server');
    });
  }

  async isAlive() {
    try {
      // Use the promisified PING command
      await promisify(this.client.ping).bind(this.client)();
      return true;  // If PING is successful, Redis is alive
    } catch (error) {
      console.log('Error while checking Redis connection:', error);
      return false;  // If PING fails, Redis is not alive
    }
  }

  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  async set(key, value, duration) {
    await this.setexAsync(key, duration, value);
  }

  async del(key) {
    await this.delAsync(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;

