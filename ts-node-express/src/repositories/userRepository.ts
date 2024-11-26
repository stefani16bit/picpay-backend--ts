import { Component, Container } from "../container";
import { MySQLClient } from "../database/mysqlClient";
import { User, UserSchema } from "../models/userModel";

export class UserRepository implements Component<UserRepository> {
	database!: MySQLClient;

	constructor(private container: Container) {}

	initialize(): void {
		this.database = this.container.resolve<MySQLClient>("mysqlClient");
	}

	getUser(userId: number): Promise<User | Error> {
		return new Promise((resolve, reject) => {
			this.database.connection.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
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

	createUser(first_name: string, last_name: string, email: string, user_type: string, password: string, CPF_CNPJ: string): Promise<User | Error> {
		return new Promise((resolve, reject) => {
			this.database.connection.query(
				"INSERT INTO users(user_type, first_name, last_name, email, password, CPF_CNPJ) VALUES (?, ?, ?, ?, ?, ?)",
				[user_type, first_name, last_name, email, password, CPF_CNPJ],
				(err, results) => {
					if (err) {
						return reject(new Error(`Error creating user: ${err.message}`));
					}

					const response = User.fromDatabase({ id: results.insertId, user_type, first_name, last_name, email, password, CPF_CNPJ } as UserSchema);
					resolve(response);
				}
			);
		});
	}
}
