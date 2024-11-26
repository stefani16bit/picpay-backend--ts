import { Express } from "express";
import { Component, Container } from "../container";
import { UserController } from "../controllers/users/userController";

export class UserRoutes implements Component<UserRoutes> {
	constructor(private container: Container) {}

	initialize(): void {
		const app = this.container.resolve<Express>("app");
		const controller = this.container.resolve<UserController>("userController");

		app.get("/users/:id", controller.getUser.bind(controller));
		app.post("/users", controller.createUser.bind(controller));
	}
}
