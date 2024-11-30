export class CreateUserRequest {
	firstName: string;
    lastName: string 
	email: string;
	userType: string;
    password: string;
	CPF_CNPJ: string;

    constructor(firstName: string, lastName: string, email: string, userType: string, password: string , CPF_CNPJ: string ) {
        this.firstName = firstName;
        this.lastName = lastName
        this.email = email
        this.userType = userType;
        this.password = password;
        this.CPF_CNPJ = CPF_CNPJ;
    }
}