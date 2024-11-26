import { User } from "../../models/userModel";

export class CreateUserResponse {
	id: number;

	constructor(user: User) {
		this.id = user.id;
	}
}
