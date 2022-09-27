import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseConnection{
  private count = 0;
  private options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  };

  constructor(){
    this.connectWithRetry();
  }
  
  getMongoose(){
    return mongoose;
  }
  
  async connectWithRetry(){
    try {
      log('Attempting MongoDB connection (will retry if needed)');
      await mongoose.connect('mongodb://localhost/chat', this.options);
      console.log('MongoDB connected');
    } catch (error) {
      console.log(`Failed connection to mongoDB ${error}`);
      const retrySeconds = 5;
      log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds):`, error);
      setTimeout(this.connectWithRetry, retrySeconds * 1000);
    }
  }
}

export default new MongooseConnection();