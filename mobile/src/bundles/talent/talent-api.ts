import { ApiPath, ContentType } from '~/bundles/common/enums/enums';
import { UserDetailsApiPath } from '~/bundles/talent/enums/enums';
import {
    type UserDetailsCreateRequestDto,
    // type UserDetailsFindRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class TalentApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async completeTalentDetails(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<UserDetailsResponseDto>();
    }

    public async completeOnboardingStep(
        payload: UserDetailsUpdateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<UserDetailsResponseDto>();
    }

    public async getUserDetailsByUserId(
        payload: Partial<UserDetailsUpdateRequestDto>,
    ): Promise<UserDetailsUpdateRequestDto | null> {
        const { userId = '' } = payload;
        const response = await this.load(
            this.getFullEndpoint(UserDetailsApiPath.ROOT, userId, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<UserDetailsUpdateRequestDto>();
    }
}

export { TalentApi };
