const ContactsCVStepValidationMessage = {
    IMG_MAX_SIZE: 'Allowed image file is < 5MB',
    IMG_TYPE: 'Allowed image could be only jpeg, png, jpg',
    FULL_NAME_REQUIRED: 'Full name is required',
    FULL_NAME_MIN_LENGTH: 'Full name must be at least {{#limit}} characters',
    FULL_NAME_MAX_LENGTH: 'Full name must be at most {{#limit}} characters',
    FULL_NAME_WRONG_PATTERN: 'Full name must contain only letters, spaces',
    PHONE_NUMBER_REQUIRED: 'Phone number is required',
    PHONE_NUMBER_PATTERN:
        'The Phone number must start with "+" and contain digits 0-9 only',
    LINKEDIN_LINK_REQUIRED: 'LinkedIn is required',
    LINKEDIN_LINK_LENGTH:
        'LinkedIn must be between {{#limit.min}} and {{#limit.max}} characters',
    LINKEDIN_LINK_WRONG_PATTERN:
        'LinkedIn link must begin with linkedin.com/in/',
    LINKEDIN_LINK_MIN_LENGTH:
        'LinkedIn link must be at least {{#limit}} characters',
    LINKEDIN_LINK_MAX_LENGTH:
        'LinkedIn link must be at most {{#limit}} characters',
    CV_MAX_SIZE: 'Max size 5MB size',
    CV_TYPE_REGEX: 'Allowed types for CV file should be docx, doc, pdf',
    CV_REQUIRED: 'CV is required',
};

export { ContactsCVStepValidationMessage };
