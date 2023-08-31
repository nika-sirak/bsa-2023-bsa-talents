import { createAsyncThunk } from '@reduxjs/toolkit';
import { type UserSignUpStep1Dto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    DEFAULT_SIGN_UP_PAYLOAD_STEP1,
    experienceYearsScaled,
} from '../components/first-step/constants/constants.js';
import { name as sliceName } from './slice.js';

const signUpStep1 = createAsyncThunk<
    UserSignUpStep1Dto,
    UserSignUpStep1Dto,
    AsyncThunkConfig
>(`${sliceName}/step1`, (registerPayload) => {
    const exactExperienceValue = experienceYearsScaled.find(
        (experience) =>
            experience.scaledValue === registerPayload.experienceYears,
    );
    registerPayload.experienceYears = exactExperienceValue
        ? exactExperienceValue.value
        : DEFAULT_SIGN_UP_PAYLOAD_STEP1.experienceYears;
    return registerPayload;
});

export { signUpStep1 };
