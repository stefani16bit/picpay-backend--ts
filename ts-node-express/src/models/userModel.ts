export class User {
	constructor(public id: number, public userType: string, public fullName: string,  public email: string, public password: string, public CPF_CNPJ: string,) {}
    
	static fromDatabase( schema: UserSchema ): User {
		return new User(schema.id, schema.user_type, schema.first_name + ' ' + schema.last_name, schema.email, schema.password, schema.CPF_CNPJ,);
	}
}

export interface UserSchema {
    id: number;
    user_type: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    CPF_CNPJ: string;
}