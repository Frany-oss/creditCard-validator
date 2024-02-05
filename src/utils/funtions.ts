export const isValidEmail = (email: string): boolean => {
  const validDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [, domain] = email.split("@");
  return emailRegex.test(email) && validDomains.includes(domain);
};

export const isValidToken = (token: string): boolean => {
  const tokenRegex = /^pk_test_[a-zA-Z0-9]{16}$/;
  return tokenRegex.test(token);
};

export const generateToken = (): string => {
  const prefix = "pk_test_";
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const tokenLength = 16;

  let token = prefix;
  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
};

export const isValidLuhn = (cardNumber: number): boolean => {
  const digits = cardNumber.toString().split("").map(Number).reverse();

  for (let i = 1; i < digits.length; i += 2) {
    digits[i] *= 2;

    if (digits[i] > 9) {
      digits[i] -= 9;
    }
  }
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  return sum % 10 === 0;
};

export const isValidExpirationYear = (year: string): boolean => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 5;
  const inputYear = parseInt(year, 10);

  return !isNaN(inputYear) && inputYear >= currentYear && inputYear <= maxYear;
};

export const isValidExpirationMonth = (month: string): boolean => {
  const inputMonth = parseInt(month, 10);

  return !isNaN(inputMonth) && inputMonth >= 1 && inputMonth <= 12;
};

export const isValidCvvNumber = (value: number): boolean => {
  const cvvString = value.toString();
  const digitCount = cvvString.length;
  return digitCount >= 3 && digitCount <= 4;
};