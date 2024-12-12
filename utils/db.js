import { MongoClient } from 'mongodb';

class DBClient {
  /**
   * Create a new Instance for DB
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.db = null;

    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error.message);
      });
  }

  isAlive() {
      return this.client.isConnected();
  }

  async nbUsers() {
    try {
      if (!this.db) throw new Error('Database not initialized');
      const collection = this.db.collection('users');
      return await collection.countDocuments();
    } catch (error) {
      console.error('Error in nbUsers:', error.message);
      return 0;
    }
  }

  async nbFiles() {
    try {
      if (!this.db) throw new Error('Db not initialized');
      const collection = this.db.collection('files');
      return await collection.countDocuments();
    } catch (error) {
      console.error('Error in nbFiles:', error.message);
      return 0;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
