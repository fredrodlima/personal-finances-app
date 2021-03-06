import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import path from 'path';
import dotenv from 'dotenv';

/**
 * Read ".env" config variables
 */
dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);
app.use(express.json());
const __dirname = path.resolve(path.dirname(''));
/**
 * Link to React App
 */
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Default route
 */
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Welcome to transactions API. Please, access /transaction and follow instructions',
  });
});

/**
 * Main routes of app
 */
app.use('/api/transaction', routes);

/**
 * Connection to DB
 */
const { DB_CONNECTION } = process.env;

console.log('Starting connection with MongoDB...');
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      //connectedToMongoDB = false;
      console.error(`Error trying to connect to MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  //connectedToMongoDB = true;
  console.log('Conected to MongoDB');

  /**
   * Port definition and app initialization
   */
  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    console.log(`Server started on port ${APP_PORT}`);
  });
});
