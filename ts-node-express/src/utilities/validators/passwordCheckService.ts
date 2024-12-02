export const enum PasswordCheckStrength {
	Invalid,
	Short,
	Common,
	Weak,
	Ok,
	Strong,
}

export class PasswordCheckService {
	public static get MinimumLength(): number {
		return 8;
	}

	private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;
	private disallowedCharacters = /[<>:^]/;

	public isPasswordCommon(password: string): boolean {
		return this.commonPasswordPatterns.test(password);
	}

	public checkPasswordStrength(password: string): PasswordCheckStrength {
		if (!password || password.length < PasswordCheckService.MinimumLength) {
			return PasswordCheckStrength.Short;
		}

		if (this.isPasswordCommon(password)) {
			return PasswordCheckStrength.Common;
		}

		if (this.disallowedCharacters.test(password)) {
			return PasswordCheckStrength.Invalid;
		}

		let criteriaMet = 0;
		if (/[a-z]/.test(password)) criteriaMet++;
		if (/[A-Z]/.test(password)) criteriaMet++;
		if (/[0-9]/.test(password)) criteriaMet++;
		if (/[^a-zA-Z0-9<>:]/.test(password)) criteriaMet++;

		if (criteriaMet < 4) {
			return PasswordCheckStrength.Weak;
		} else if (criteriaMet === 4) {
			return PasswordCheckStrength.Ok;
		} else {
			return PasswordCheckStrength.Strong;
		}
	}
}
