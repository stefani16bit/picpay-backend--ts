import { Request, Response } from "express";
import { Component, Container } from "../../container";
import { UserService } from "../../services/userService";
import { GetUserResponse } from "./GetUserResponse";
import { CreateUserResponse } from "./CreateUserResponse";

export class UserController implements Component<UserController> {
	service!: UserService;

	constructor(private container: Container) {}

	initialize(): void {
		this.service = this.container.resolve<UserService>("userService");
	}

	async getUser(req: Request, res: Response) {
		if (req.params.id === undefined) {
			res.status(400).json({ message: "Bad request" });
			return;
		}

		const response = await this.service.getUser(parseInt(req.params.id, 10));

		if (response instanceof Error) {
			res.status(404).json({ message: response.message });
		} else {
			res.json(new GetUserResponse(response));
		}
	}

	async createUser(req: Request, res: Response) {
		const first_name = req.body.first_name
		if (first_name === undefined) {
			res.status(400).json({ message: "Bad request, missing first_name" });
			return;
		}

		const last_name = req.body.last_name
		if (last_name === undefined) {
			res.status(400).json({ message: "Bad request, missing last_name" });
			return;
		}

		const email = req.body.email
		if (email === undefined) {
			res.status(400).json({ message: "Bad request, missing email" });
			return;
		}

		const user_type = req.body.user_type
		if (user_type === undefined) {
			res.status(400).json({ message: "Bad request, missing user_type" });
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

		const response = await this.service.createUser(first_name, last_name, email, user_type, password, CPF_CNPJ)

		if (response instanceof Error) {
			res.status(404).json({ message: response.message });
		} else {
			res.json(new CreateUserResponse(response));
		}
	}
}
