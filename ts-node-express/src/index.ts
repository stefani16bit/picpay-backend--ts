import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { Container } from "./container";
import { UserRoutes } from "./routes/userRoutes";
import { UserController } from "./controllers/users/userController";
import { UserService } from "./services/userService";
import { MySQLClient } from "./database/mysqlClient";
import { UserRepository } from "./repositories/userRepository";

dotenv.config();

const app: Express = express();

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

const container = new Container();
container.register<Express>("app", app);

container.register<MySQLClient>(
	"mysqlClient",
	new MySQLClient(process.env.HOST!, process.env.USER!, process.env.PASSWORD!, process.env.DATABASE!, process.env.DATABASE_PORT!)
);

container.register<UserRoutes>("userRoutes", new UserRoutes(container));
container.register<UserController>("userController", new UserController(container));
container.register<UserService>("userService", new UserService(container));
container.register<UserRepository>("userRepository", new UserRepository(container));

container.initialize();

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
