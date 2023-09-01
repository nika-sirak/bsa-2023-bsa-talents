import { createAsyncThunk } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';

import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/auth/types/types';
import { ErrorMessages } from '~/bundles/common/enums/enums';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import { StorageKey } from '~/framework/storage/enums/enums';

import { name as sliceName } from './slice';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (signUpPayload, { extra }) => {
    const { authApi, storage } = extra;
    try {
        const response = await authApi.signUp(signUpPayload);
        await storage.set(StorageKey.TOKEN, response.token);

        return response;
    } catch (error) {
        if (error instanceof Error) {
            Toast.show({
                type: 'error',
                text1: error.message,
            });
            throw error;
        }
        throw error;
    }
});

const signIn = createAsyncThunk<
    UserSignInResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, async (signInPayload, { extra }) => {
    const { authApi, storage, notifications } = extra;
    try {
        const response = await authApi.signIn(signInPayload);
        await storage.set(StorageKey.TOKEN, response.token);
        return response;
    } catch (error) {
        if (error instanceof Error) {
            notifications.showError(error.message);
            throw error;
        }
        notifications.showError(ErrorMessages.UNKNOWN_ERROR);
        throw error;
    }
});

export { signIn, signUp };
