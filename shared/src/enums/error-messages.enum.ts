const ErrorMessages = {
    NOT_AUTHORIZED: 'You are not authorized to access this route.',
    USER_ALREADY_EXIST: 'User already exist.',
    INCORRECT_EMAIL: 'Incorrect email.',
    EMAIL_ALREADY_EXISTS: 'Email is already taken.',
    PASSWORDS_NOT_MATCH: 'Passwords do not match.',
    UNKNOWN_ERROR: 'Application error',
    USER_NOT_FOUND: 'No user found for provided credentials',
    METHOD_NOT_IMPLEMENTED: 'This method has not been implemented',
} as const;

export { ErrorMessages };
