export const failure = {
    display: 'block',
    border: '0.5px solid red',
    padding: 10,
    color: 'red'
}

export const defaultTo = {
    display: 'none',
}

export const passValidator = (password) => {
    const passwordErrors = [];
    if (!(/[A-Z]/.test(password))) {
        passwordErrors.push("The password needs to contain at least one capital letter [A - Z]")
    }
    if (!(/\d/.test(password))) {
        passwordErrors.push("The password needs to contain at least one number")
    }
    if (!(/[!@#\$%^\&\*()_\+\-=[\]{};':"|,.<>\\/?]/.test(password))) {
        passwordErrors.push(`The password needs to contain at least one special character like [ !@#$%^&*()_+-=[]{};':"|,.<>/?]`)
    }
    if (password.length < 6) {
        passwordErrors.push("Password length must be more than six characters in total")
    }
    return passwordErrors
}

export const confirmPassValidator = (password, confirmPassword) => password === confirmPassword