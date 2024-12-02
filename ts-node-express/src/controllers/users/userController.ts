import { Request, Response } from "express";
import { Component, Container } from "../../container";
import { UserService } from "../../services/userService";
import { GetUserResponse } from "./GetUserResponse";
import { CreateUserResponse } from "./CreateUserResponse";
import { CreateUserRequest } from "./CreateUserRequest";
import { GetUserRequest } from "./GetUserRequest";

export class UserController implements Component<UserController> {
	service!: UserService;

	constructor(private container: Container) {}

	initialize(): void {
		this.service = this.container.resolve<UserService>("userService");
	}

	async getUserByID(req: Request, res: Response) {
		const id = req.params.id
		if (id === undefined) {
			res.status(400).json({ message: "Bad request" });
			return;
		}
	
		const request = new GetUserRequest(parseInt(id, 10));
		const response = await this.service.getUserByID(request);

		if (response instanceof Error) {
			res.status(404).json({ message: response.message });
		} else {
			res.json(new GetUserResponse(response));
		}
	}

	async createUser(req: Request, res: Response) {
		const firstName = req.body.firstName
		if (firstName === undefined) {
			res.status(400).json({ message: "Bad request, missing firstName" });
			return;
		}

		const lastName = req.body.lastName
		if (lastName === undefined) {
			res.status(400).json({ message: "Bad request, missing lastName" });
			return;
		}

		const email = req.body.email
		if (email === undefined) {
			res.status(400).json({ message: "Bad request, missing email" });
			return;
		}

		const userType = req.body.userType
		if (userType === undefined) {
			res.status(400).json({ message: "Bad request, missing userType" });
			return;
		}

		const password = req.body.password
		if (password === undefined) {
			res.status(400).json({ message: "Bad request, missing password" });
			return;
		}

		const CPF_CNPJ = req.body.CPF_CNPJ
		if (CPF_CNPJ === undefined) {
			res.status(400).json({ message: "Bad request, missing CPF/CNPJ" });
			return;
		}

		const request = new CreateUserRequest(firstName, lastName, email, userType, password, CPF_CNPJ)
		const response = await this.service.createUser(request)

		if (response instanceof Error) {
			res.status(404).json({ message: response.message });
		} else {
			res.json(new CreateUserResponse(response));
		}
	}
}
