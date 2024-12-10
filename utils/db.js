import { MongoClient } from 'mongodb';


class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;
    this.dbName = database;
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.connected = false;


    this.client.connect()
      .then(() => {
	this.connected = true;
      })
      .catch((error) => {
	  console.error('MongoDB connection error:', error);
      });
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.connected) {
      return 0;
    }
    const db = this.client.db(this.dbName);
    try {	    
      const usersCount = await db.collection('users').countDocuments();
      return usersCount;
    } catch (error) {
      console.error('Error counting users:', error);
      return 0;
    }
  }
  
  async nbFiles() {
      if (!this.Connected) {
	  return 0;
      }
      const db = this.client.db(this.dbName);
      try {
        const filesCount = await db.collection('files').countDocuments();
        return filesCount;
      } catch (error) {
	console.error('Error counting files:', error);
	return 0;
      }
  }
}

// Create and export a single instance of DBClient
const dbClient = new DBClient();
export default dbClient;
