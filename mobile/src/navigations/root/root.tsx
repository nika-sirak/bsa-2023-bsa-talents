import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { loadCurrentUser } from '~/bundles/auth/store/actions';
import {
    DataStatus,
    RootScreenName,
    TalentOnboardingScreenName,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { type RootNavigationParameterList } from '~/bundles/common/types/types';
import { actions as talentActions } from '~/bundles/talent/store';
import { type UserDetailsFindRequestDto } from '~/bundles/talent/types/types';
import { UserRole } from '~/bundles/users/enums/enums';
import { AuthNavigator } from '~/navigations/auth-navigator/auth-navigator';
import {
    EmployerBottomTabNavigator,
    TalentBottomTabNavigator,
} from '~/navigations/bottom-tab-navigator/bottom-tab-navigator';
import { TalentOnboardingNavigator } from '~/navigations/onboarding-navigator/onboarding-navigator';

const RootStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const Root: React.FC = () => {
    const { isSignedIn, dataStatus, currentUserData } = useAppSelector(
        ({ auth }) => auth,
    );
    const { completedStep } = useAppSelector(({ talents }) => talents);
    const { role } = currentUserData ?? {};
    const dispatch = useAppDispatch();

    const isPendingAuth = dataStatus === DataStatus.PENDING;
    const isProfileComplete =
        completedStep === TalentOnboardingScreenName.PREVIEW;

    useEffect(() => {
        void dispatch(loadCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        const payload: UserDetailsFindRequestDto = {
            userId: currentUserData?.id,
        };
        void dispatch(talentActions.getTalentDetails(payload));
    }, [currentUserData?.id, dispatch]);

    if (isPendingAuth) {
        return null;
    }

    const navigators = {
        auth: (
            <RootStack.Screen
                name={RootScreenName.AUTH_ROOT_ROUTE}
                component={AuthNavigator}
            />
        ),
        onboarding: (
            <RootStack.Screen
                name={RootScreenName.ONBOARDING_ROOT_ROUTE}
                // TODO: create EmployerOnboardingNavigator for role == 'employer'
                component={TalentOnboardingNavigator}
            />
        ),
        main: (
            <RootStack.Screen
                name={RootScreenName.MAIN_ROOT_ROUTE}
                component={
                    role === UserRole.TALENT
                        ? TalentBottomTabNavigator
                        : EmployerBottomTabNavigator
                }
            />
        ),
    };

    const renderStackScreen = (): React.JSX.Element => {
        if (isSignedIn && isProfileComplete) {
            return navigators.main;
        }
        if (isSignedIn && !isProfileComplete) {
            //TODO redirect to next after completedStep screen
            return navigators.onboarding;
        }
        return navigators.auth;
    };

    return (
        <RootStack.Navigator screenOptions={screenOptions}>
            {renderStackScreen()}
        </RootStack.Navigator>
    );
};

export { Root };
