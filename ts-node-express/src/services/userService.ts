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

	async getUser(request: GetUserRequest): Promise<User | Error> {
		if (isNaN(request.id)) {
			return Promise.reject(new Error("Invalid user ID"));
		}

		return await this.repository.getUser(request).catch((err: Error) => err);
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
		/**
		 * first_name/last_name: quantidade de char, se aceita apenas letras
		 * email: regex de email
		 * user_type: payee/payer
		 * password: quantidade de char, validar senha forte, e caracteres permitidos
		 * CPF_CNPJ: regex para cpf_cnpj e calculo para valida cpf ou cnpj
		 */
		
		return await this.repository.createUser(request).catch((err: Error) => err);
	}
}
