import { Component, Container } from "../container";
import { User } from "../models/userModel";
import { UserRepository } from "../repositories/userRepository";

export class UserService implements Component<UserService> {
	repository!: UserRepository;

	constructor(private container: Container) {}

	initialize(): void {
		this.repository = this.container.resolve<UserRepository>("userRepository");
	}

	async getUser(userId: number): Promise<User | Error> {
		if (isNaN(userId)) {
			return Promise.reject(new Error("Invalid user ID"));
		}

		return await this.repository.getUser(userId).catch((err: Error) => err);
	}

	async createUser(first_name: string, last_name: string, email: string, user_type: string, password: string, CPF_CNPJ: string): Promise<User | Error> {
		/**
		 * first_name/last_name: quantidade de char, se aceita apenas letras
		 * email: regex de email
		 * user_type: payee/payer
		 * password: quantidade de char, validar senha forte, e caracteres permitidos
		 * CPF_CNPJ: regex para cpf_cnpj e calculo para valida cpf ou cnpj
		 */
		return await this.repository.createUser(first_name, last_name, email, user_type, password, CPF_CNPJ).catch((err: Error) => err);
	}
}
