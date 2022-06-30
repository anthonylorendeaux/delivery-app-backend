import express, { Express, Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import "dotenv/config"
import routes from "./Routes"
import connect from "./utils/connect"
import Logger from "./utils/logger"
import swaggerDocs from "./utils/swagger"
import cors from 'cors';
import * as socketio from "socket.io";
import * as http from "http";

const app: Express = express()
const server: http.Server = http.createServer(app)
const io: socketio.Server = new socketio.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
})
io.attach(server);

app.use(express.json())

const options: cors.CorsOptions = {
  origin: '*'
};

app.use(cors(options));

app.get("/", (req: Request, res: Response) => {
  res.send("Microservice is running !")
})

app.set('io', io);

const PORT = process.env.PORT
const db = process.env.DATABASE_URL || "mongodb://localhost:27017/restaurants"

connect(db)
routes(app)

server.listen(PORT, () => {
  Logger.info(`App is running on port ! ${PORT}`) 
  
  swaggerDocs(app)
})

io.on('connection', (socket) => {
  Logger.info('a user connected', socket);
});