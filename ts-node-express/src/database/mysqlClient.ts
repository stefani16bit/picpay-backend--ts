import * as mysql from "mysql";

import { Component } from "../container";

export class MySQLClient implements Component<MySQLClient> {
    connection: mysql.Connection;

	constructor(host: string, user: string, password: string, database: string, databasePort: string) {
		this.connection = mysql.createConnection({
			host: host,
			user: user,
			password: password,
			database: database,
            port: parseInt(databasePort)
		});
	}

	initialize(): void {
        this.connection.connect((err) => {
            if (err) {
                console.error("Error connecting to MySQL: " + err.stack);
                return process.exit(1);
            }

            console.log("Connected to MySQL as id " + this.connection.threadId);
        });
    }
}
