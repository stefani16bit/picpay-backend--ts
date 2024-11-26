import { User } from "../../models/userModel";

export class GetUserResponse {
	id: number;
	fullName: string;
	email: string;
	userType: string;
	CPF_CNPJ: string;

    constructor(user: User) {
        this.id = user.id;
        this.fullName = user.fullName;
        this.email = user.email;
        this.userType = user.userType;
        this.CPF_CNPJ = user.CPF_CNPJ;
    }
}
