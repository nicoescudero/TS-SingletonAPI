import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import { options } from './docs/swaggerConfig';
import { MyRoutes } from './routes/index.routes';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const debugLog: debug.IDebugger = debug('app');
const dotenvResult = dotenv.config();
const port = 3000;

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true}),
    ),
};
  
if(dotenvResult.error) throw dotenvResult.error;
if(!process.env.DEBUG) loggerOptions.meta = false;
  
app.use(cors());
app.use(express.json());
app.use(expressWinston.logger(loggerOptions));
app.use('/docs',swaggerUI.serve, swaggerUI.setup(options));
app.get('/',(_req: express.Request, res: express.Response) => { 
    return res.send('Server on port 3000');
});

const myRoutes: MyRoutes = new MyRoutes(app);
myRoutes.loadRoutes();

server.listen(port, ()=>{
    debugLog(`Server running at http://localhost:${port}`);
});

export default app;