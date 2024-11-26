// Interface que representa um componente genérico que pode ser inicializado
export interface Component<T> {
	initialize(): void;
}

// Classe que representa um container de injeção de dependência
export class Container {
	// Dicionário privado que mapeia chaves de string para instâncias de qualquer tipo
	private instances: { [key: string]: any } = {};

	/**
	 * Função que resolve uma instância de um tipo genérico a partir de uma chave
	 * 
	 * @param key Indica a chave que mapeia a instância desejada
	 * @returns Retorna a instância desejada
	 */
	resolve<T>(key: string): T {
		return this.instances[key];
	}

	/**
	 * Função que registra uma instância de um tipo genérico a partir de uma chave
	 * 
	 * @param key Indica a chave que mapeia a instância desejada
	 * @param instance Indica a instância desejada
	 */
	register<T>(key: string, instance: T) {
		this.instances[key] = instance;
	}

	/**
	 * Função que inicializa todas as instâncias registradas que implementam a interface Component
	 */
	initialize(): void {
		// Itera sobre todas as instâncias registradas
		for (const key in this.instances) {
			// Obtém a instância atual
			const instance = this.instances[key];

			// Verifica se a instância atual implementa a interface Component
			if (instance instanceof Object && "initialize" in instance) {
				// Inicializa a instância atual
				instance.initialize();
			}
		}
	}
}
