import '~/assets/css/styles.scss';

import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth.js';
import {
    App,
    Navigate,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { store } from '~/framework/store/store.js';

import { ProtectedRoute } from './bundles/auth/components/components.js';
import { useAppSelector } from './bundles/common/hooks/hooks.js';
import { NotFoundPage } from './bundles/common/pages/not-found/not-found.js';
import { theme } from './bundles/common/themes/theme.js';
import { StepNavigation } from './bundles/talent-onboarding/components/components.js';
import { STEP_ROUTES } from './bundles/talent-onboarding/constants/constants.js';
import { getStepRoute } from './bundles/talent-onboarding/helpers/helpers.js';
import { Onboarding } from './bundles/talent-onboarding/pages/onboarding/onboarding.js';

const AppRouting: React.FC = () => {
    const dataStatus = useAppSelector(({ auth }) => auth.dataStatus);

    const getInitialRoute = (): React.ReactElement => {
        return dataStatus === 'fulfilled' ? (
            <Navigate to={AppRoute.TALENT} />
        ) : (
            <Navigate to={AppRoute.SIGN_IN} />
        );
    };

    return getInitialRoute();
};

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <StoreProvider store={store.instance}>
                    <RouterProvider
                        routes={[
                            {
                                path: AppRoute.ROOT,
                                element: <App />,
                                children: [
                                    {
                                        path: AppRoute.ROOT,
                                        element: <AppRouting />,
                                    },
                                    {
                                        path: AppRoute.TALENT,
                                        element: (
                                            <ProtectedRoute>
                                                <Onboarding />
                                            </ProtectedRoute>
                                        ),
                                        children: [
                                            {
                                                path: AppRoute.TALENT,
                                                element: (
                                                    <ProtectedRoute>
                                                        <Navigate
                                                            to={getStepRoute(
                                                                STEP_ROUTES.STEP_01,
                                                            )}
                                                        />
                                                    </ProtectedRoute>
                                                ),
                                            },
                                            {
                                                path: AppRoute.TALENT_STEP,
                                                element: (
                                                    <ProtectedRoute>
                                                        <StepNavigation />
                                                    </ProtectedRoute>
                                                ),
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                path: AppRoute.SIGN_IN,
                                element: <Auth />,
                            },
                            {
                                path: AppRoute.SIGN_UP,
                                element: <Auth />,
                            },
                            {
                                path: AppRoute.OTHER,
                                element: <NotFoundPage />,
                            },
                        ]}
                    />
                </StoreProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    </StrictMode>,
);
