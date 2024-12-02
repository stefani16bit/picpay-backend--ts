import validateCNPJ from "./cnpjValidator";
import validateCPF from "./cpfValidator";
import { PasswordCheckService, PasswordCheckStrength } from "./passwordCheckService";

export class UserParamsValidators {
	static validateName(name: string): boolean {
		const nameRegex = /^[A-Za-z]*/;
		return nameRegex.test(name);
	}

	static validateEmail(email: string): boolean {
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		return emailRegex.test(email);
	}

	static validateUserType(userType: string): boolean {
		if (userType.toLowerCase() == "payee" || userType.toLowerCase()  == "payer") {
			return true;
		}

		return false;
	}

	static validatePassowrd(password: string): boolean {

		const passwordCheckService = new PasswordCheckService();
		const strength = passwordCheckService.checkPasswordStrength(password);

		return strength === PasswordCheckStrength.Ok || strength === PasswordCheckStrength.Strong;
	}

    static validateCPF_CNPJ(CPF_CNPJ: string): boolean {
        return validateCPF(CPF_CNPJ) || validateCNPJ(CPF_CNPJ)
    }
}
