import React from 'react';

import { actions as authActions } from '~/bundles/auth/store';
import { Text } from '~/bundles/common/components/components';
import { AuthScreenName } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { AvatarPicker } from '~/bundles/talent/components/components';
import { actions as userActions } from '~/bundles/users/store';
import { type UserSignUpRequestDto } from '~/bundles/users/users';

import { SignInForm, SignUpForm } from '../components/components';

const Auth: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));

    const isSignUpScreen = name === AuthScreenName.SIGN_UP;

    useEffect(() => {
        if (isSignUpScreen) {
            void dispatch(userActions.loadAll());
        }
    }, [isSignUpScreen, dispatch]);

    const handleSignInSubmit = useCallback(() => {
        // TODO: handle sign in
    }, []);

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AuthScreenName.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AuthScreenName.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    return (
        <>
            <Text>state: {dataStatus}</Text>
            {getScreen(name)}
            <AvatarPicker />
        </>
    );
};

export { Auth };
