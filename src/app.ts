import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import dotenv from 'dotenv';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UserRoutes } from './users/users.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const debugLog: debug.IDebugger = debug('app');
const dotenvResult = dotenv.config();
const routes: Array<CommonRoutesConfig> = [];
const port = 3000;

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true}),
    ),
};

app.use(express.json());
app.use(cors());

if(dotenvResult.error) throw dotenvResult.error;
if(!process.env.DEBUG) loggerOptions.meta = false;


app.use(expressWinston.logger(loggerOptions));
routes.push(new UserRoutes(app));
app.get('/',(req: express.Request, res: express.Response) => { return res.send('Server on port 3000')});

server.listen(port, ()=>{
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.name}`);
  });
});

export default app;