import React from 'react';

import {
    Button,
    FormField,
    Input,
    Link,
    Text,
    View,
} from '~/bundles/common/components/components';
import { RootScreenName } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';

import { USER_SIGN_UP_DEFAULT_VALUES } from './constants/constants';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};
const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: USER_SIGN_UP_DEFAULT_VALUES,
        validationSchema: userSignUpValidationSchema,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <View>
            <Text>Sign Up</Text>
            <FormField errors={errors} label="Email" name="email" required>
                <Input
                    control={control}
                    name="email"
                    placeholder="Enter your email"
                    editable
                />
            </FormField>
            <FormField
                errors={errors}
                label="Password"
                name="password"
                required
            >
                <Input
                    control={control}
                    name="password"
                    placeholder="Enter your password"
                    secureTextEntry
                    editable
                />
            </FormField>
            <Button label="Sign up" onPress={handleFormSubmit} />
            <Link label="Go to Sign In" to={`/${RootScreenName.SIGN_IN}`} />
        </View>
    );
};

export { SignUpForm };
