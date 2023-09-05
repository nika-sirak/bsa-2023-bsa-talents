import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

import { name as sliceName } from './slice';

const setProfileStep = createAsyncThunk<
    ProfileStepDto,
    ProfileStepDto,
    AsyncThunkConfig
>(`${sliceName}/profile-step`, (profileStepPayload, { extra }) => {
    const { talentApi } = extra;
    return talentApi.setProfileStep(profileStepPayload);
});

export { setProfileStep };
