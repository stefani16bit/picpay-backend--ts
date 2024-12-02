import { Component, Container } from "../container";
import { CreateUserRequest } from "../controllers/users/CreateUserRequest";
import { GetUserRequest } from "../controllers/users/GetUserRequest";
import { MySQLClient } from "../database/mysqlClient";
import { User, UserSchema } from "../models/userModel";

export class UserRepository implements Component<UserRepository> {
	database!: MySQLClient;

	constructor(private container: Container) {}

	initialize(): void {
		this.database = this.container.resolve<MySQLClient>("mysqlClient");
	}

	getUserByID(request: GetUserRequest): Promise<User | Error> {
		return new Promise((resolve, reject) => {
			this.database.connection.query("SELECT * FROM users WHERE id = ?", [request.id], (err, results) => {
				if (err) {
					return reject(new Error(`Error fetching user: ${err.message}`));
				}

				if (results.length === 0) {
					return reject(new Error("User not found"));
				}

				const response = User.fromDatabase(results[0] as UserSchema);
				resolve(response);
			});
		});
	}

	createUser(request: CreateUserRequest): Promise<User | Error> {
		return new Promise((resolve, reject) => {
			this.database.connection.query(
				"INSERT INTO users(user_type, first_name, last_name, email, password, CPF_CNPJ) VALUES (?, ?, ?, ?, ?, ?)",
				[request.userType, request.firstName, request.lastName, request.email, request.password, request.CPF_CNPJ],
				(err, results) => {
					if (err) {
						return reject(new Error(`Error creating user: ${err.message}`));
					}

					const response = User.fromDatabase({
						id: results.insertId,
						user_type: request.userType,
						first_name: request.firstName,
						last_name: request.lastName,
						email: request.email,
						password: request.password,
						CPF_CNPJ: request.CPF_CNPJ,
					} as UserSchema);
					resolve(response);
				}
			);
		});
	}
}
