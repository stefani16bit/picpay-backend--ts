const validateDigit = (arr: number[], position: number): boolean => {
    let weights: number[];
    let arrayItems: number;
    let sum = 0;
  
    if (position === 1) {
      weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      arrayItems = 12;
    } else {
      weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      arrayItems = 13;
    }
  
    for (let i = 0; i < arrayItems; i += 1) {
      const calc = weights[i] * arr[i];
      sum += calc;
    }
  
    const division = Math.floor(sum % 11);
    let verifyingDigit = 0;
  
    if (division >= 2) {
      verifyingDigit = 11 - division;
    }
  
    if (arr[arrayItems] !== verifyingDigit) {
      return false;
    }
  
    return true;
  };
  
  const validateCNPJ = (cnpj: unknown): boolean => {
    if (typeof cnpj !== 'string' && typeof cnpj !== 'number') {
      return false;
    }
  
    let filteredCNPJ = String(cnpj);
    filteredCNPJ = filteredCNPJ.replace(/\.|-|\//g, '');
  
    if (filteredCNPJ.length !== 14) {
      return false;
    }
  
    const arrCNPJ: number[] = Array.from(filteredCNPJ, Number);
  
    const repeatedNumbers: boolean = arrCNPJ.every((num, i, arr) => num === arr[0]);
    if (repeatedNumbers) {
      return false;
    }
  
    const firstDigit = validateDigit(arrCNPJ, 1);
    const secondDigit = validateDigit(arrCNPJ, 2);
    if (!firstDigit || !secondDigit) {
      return false;
    }
  
    return true;
  };
  
  export default validateCNPJ;