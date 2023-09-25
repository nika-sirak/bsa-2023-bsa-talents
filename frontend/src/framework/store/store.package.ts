import {
    type AnyAction,
    combineReducers,
    type MiddlewareArray,
    type Reducer,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { reducer as appReducer } from '~/app/store/app.js';
import { adminApi } from '~/bundles/admin-panel/admin.js';
import { reducer as adminReducer } from '~/bundles/admin-panel/store/admin.js';
import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { reducer as candidateReducer } from '~/bundles/candidate/store/candidate.js';
import { chatApi } from '~/bundles/chat/chat.js';
import { reducer as chatReducer } from '~/bundles/chat/store/chat.js';
import { bsaBadgesApi } from '~/bundles/common/data/bsa-badges/bsa-badges.js';
import { reducer as bsaBadgesReducer } from '~/bundles/common/data/bsa-badges/store/bsa-badges.js';
import { hardSkillsApi } from '~/bundles/common/data/hard-skills/hard-skills.js';
import { reducer as hardSkillsReducer } from '~/bundles/common/data/hard-skills/store/hard-skills.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { employerOnBoardingApi } from '~/bundles/employer-onboarding/employer-onboarding.js';
import { reducer as employerOnboardingReducer } from '~/bundles/employer-onboarding/store/employer-onboarding.js';
import { employersApi } from '~/bundles/employers/employers.js';
import { reducer as employerReducer } from '~/bundles/employers/store/employers.js';
import { fileUploadApi } from '~/bundles/file-upload/file-upload.js';
import { reducer as lmsReducer } from '~/bundles/lms/store/lms.js';
import { reducer as cabinetReducer } from '~/bundles/profile-cabinet/store/profile-cabinet.js';
import { reducer as talentOnBoardingReducer } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { talentOnBoardingApi } from '~/bundles/talent-onboarding/talent-onboarding.js';
import { type Config } from '~/framework/config/config.js';
import { notification } from '~/services/services.js';

import { storage } from '../storage/storage.js';
import { chatSocket, errorHandler } from './middlewares/middlewares.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    admin: ReturnType<typeof adminReducer>;
    talentOnBoarding: ReturnType<typeof talentOnBoardingReducer>;
    employer: ReturnType<typeof employerReducer>;
    employerOnBoarding: ReturnType<typeof employerOnboardingReducer>;
    hardSkills: ReturnType<typeof hardSkillsReducer>;
    lms: ReturnType<typeof lmsReducer>;
    app: ReturnType<typeof appReducer>;
    chats: ReturnType<typeof chatReducer>;
    candidate: ReturnType<typeof candidateReducer>;
    bsaBadges: ReturnType<typeof bsaBadgesReducer>;
    cabinet: ReturnType<typeof cabinetReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    adminApi: typeof adminApi;
    chatApi: typeof chatApi;
    fileUploadApi: typeof fileUploadApi;
    talentOnBoardingApi: typeof talentOnBoardingApi;
    employerOnBoardingApi: typeof employerOnBoardingApi;
    employersApi: typeof employersApi;
    notification: typeof notification;
    storage: typeof storage;
    hardSkillsApi: typeof hardSkillsApi;
    bsaBadgesApi: typeof bsaBadgesApi;
};

const combinedReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    lms: lmsReducer,
    chat: chatReducer,
    employerOnBoarding: employerOnboardingReducer,
    talentOnBoarding: talentOnBoardingReducer,
    employer: employerReducer,
    app: appReducer,
    candidate: candidateReducer,
    cabinet: cabinetReducer,
    bsaBadges: bsaBadgesReducer,
    hardSkills: hardSkillsReducer,
});

type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === 'app/resetStore') {
        state = {} as RootState;
    }
    return combinedReducer(state, action);
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            AnyAction,
            MiddlewareArray<
                [ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]
            >
        >
    >;

    public constructor(config: Config) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) => [
                errorHandler,
                ...getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                }),
                chatSocket,
            ],
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            adminApi,
            chatApi,
            fileUploadApi,
            talentOnBoardingApi,
            employerOnBoardingApi,
            employersApi,
            notification,
            storage,
            hardSkillsApi,
            bsaBadgesApi,
        };
    }
}

export { type RootReducer, Store };
