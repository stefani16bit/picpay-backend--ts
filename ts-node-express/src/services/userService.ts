import bcryptjs from 'bcryptjs';
import { Component, Container } from "../container";
import { CreateUserRequest } from "../controllers/users/CreateUserRequest";
import { GetUserRequest } from "../controllers/users/GetUserRequest";
import { User } from "../models/userModel";
import { UserRepository } from "../repositories/userRepository";
import { UserParamsValidators } from "../utilities/validators/userParamsValidators";

export class UserService implements Component<UserService> {
	repository!: UserRepository;

	constructor(private container: Container) {}

	initialize(): void {
		this.repository = this.container.resolve<UserRepository>("userRepository");
	}

	async getUserByID(request: GetUserRequest): Promise<User | Error> {
		if (isNaN(request.id)) {
			return Promise.reject(new Error("Invalid user ID"));
		}

		return await this.repository.getUserByID(request).catch((err: Error) => err);
	}
	
	async createUser(request: CreateUserRequest): Promise<User | Error> {
		if (!UserParamsValidators.validateName(request.firstName)) {
			return new Error("Primeiro nome inválido.");
		}

		if (!UserParamsValidators.validateName(request.lastName)) {
			return new Error("Sobrenome inválido.");
		}

		if (!UserParamsValidators.validateEmail(request.email)) {
			return new Error("email inválido.");
		}
		
		if (!UserParamsValidators.validateUserType(request.userType)) {
			return new Error("Tipo de usuário inválido.")
		}

		if(!UserParamsValidators.validateCPF_CNPJ(request.CPF_CNPJ)) {
			return new Error("Tipo de CPF/CNPJ inválido.")		
		}
		if (!UserParamsValidators.validatePassowrd(request.password)) {
			return new Error("Senha inválida. A senha deve ser forte.");
		}

		const hashedPassword = await bcryptjs.hash(request.password, 10);
		request.password = hashedPassword;
					
		return await this.repository.createUser(request).catch((err: Error) => err);
	}
}
