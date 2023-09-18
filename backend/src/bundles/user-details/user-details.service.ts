import { mapQueryValuesToArrays } from 'shared/build/index.js';

import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import {
    type UserDetailsCreateRequestDto,
    type UserDetailsFindRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsSearchUsersRequestDto,
    type UserDetailsUpdateRequestDto,
} from './types/types.js';
import { type UserDetailsEntity } from './user-details.entity.js';
import { type UserDetailsRepository } from './user-details.repository.js';

class UserDetailsService implements Service {
    private userDetailsRepository: UserDetailsRepository;

    public constructor(userDetailsRepository: UserDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public async find(
        payload: UserDetailsFindRequestDto,
    ): Promise<UserDetailsEntity | null> {
        return this.userDetailsRepository.find({ ...payload });
    }

    public async findByUserId(
        userId: string,
    ): Promise<UserDetailsEntity | null> {
        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                status: HttpCode.NOT_FOUND,
                message: ErrorMessages.USER_DETAILS_NOT_FOUND,
            });
        }
        return userDetails;
    }

    public findAll(): Promise<{ items: unknown[] }> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public searchUsers(
        searchData: UserDetailsSearchUsersRequestDto,
    ): Promise<UserDetailsEntity[]> {
        const preparedData = mapQueryValuesToArrays(searchData, [
            'searchValue',
            'sortBy',
        ]);

        return this.userDetailsRepository.searchUsers(preparedData);
    }

    public async create(
        payload: UserDetailsCreateRequestDto,
    ): Promise<UserDetailsResponseDto> {
        const newUserDetails = await this.userDetailsRepository.create(payload);
        return newUserDetails.toObject();
    }

    public async update(
        payload: UserDetailsUpdateRequestDto,
    ): Promise<UserDetailsEntity> {
        const { userId, ...rest } = payload;
        const userDetails = await this.userDetailsRepository.find({ userId });

        if (!userDetails) {
            throw new HttpError({
                message: ErrorMessages.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const userDetailsId = userDetails.toObject().id as string;

        return this.userDetailsRepository.update({
            id: userDetailsId,
            ...rest,
        });
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { UserDetailsService };
