import {
    type UserDetailsApproveRequestDto,
    type UserDetailsUpdateRequestDto,
} from 'shared/build/index.js';
import {
    UserDetailsApiPath,
    userDetailsApproveValidationSchema,
    userDetailsUpdateValidationSchema,
} from 'shared/build/index.js';

import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/packages/controller/controller.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { ControllerBase } from '~/common/packages/packages.js';

import { type UserDetailsService } from './user-details.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      UserDetails:
 *        type: object
 *        properties:
 *          id?:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          userId:
 *            format: uuid #Example: '550e8400-e29b-41d4-a716-446655440000'
 *            type: string
 *          isApproved?:
 *            type: boolean
 *          deniedReason?:
 *            type: string
 *          isHired?:
 *            type: boolean
 *          profileName?:
 *            type: string
 *          salaryExpectation?:
 *            type: number
 *          hiredSalary?:
 *            type: number
 *          jobTitle?:
 *            type: string
 *          location?:
 *            type: string
 *          experienceYears?:
 *            type: number
 *          employmentType?:
 *            type: array
 *            items:
 *              type: string
 *          description?:
 *            type: string
 *          englishLevel?:
 *            type: string
 *          notConsidered?:
 *            type: array
 *            items:
 *              type: string
 *          preferredLanguages?:
 *            type: array
 *            items:
 *              type: string
 *          projectLinks?:
 *            type: array
 *            items:
 *              type: string
 *          photoId?:
 *            type: string
 *          fullName?:
 *            type: string
 *          phone?:
 *            type: string
 *          linkedinLink?:
 *            type: string
 *          companyName?:
 *            type: string
 *          companyLogoId?:
 *            type: string
 *          companyWebsite?:
 *            type: string
 *          employerPosition?:
 *            type: string
 *          cvId?:
 *            type: string
 */
class UserDetailsController extends ControllerBase {
    private userDetailsService: UserDetailsService;

    public constructor(logger: Logger, userDetailsService: UserDetailsService) {
        super(logger, ApiPath.USER_DETAILS);

        this.userDetailsService = userDetailsService;

        this.addRoute({
            path: UserDetailsApiPath.UPDATE,
            method: 'PATCH',
            validation: {
                body: userDetailsUpdateValidationSchema,
            },
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: UserDetailsUpdateRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: UserDetailsApiPath.APPROVE,
            method: 'PATCH',
            validation: {
                body: userDetailsApproveValidationSchema,
            },
            handler: (options) =>
                this.approve(
                    options as ApiHandlerOptions<{
                        body: UserDetailsApproveRequestDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /user-details/update:
     *    patch:
     *      tags: [User Details]
     *      description: Updates a user's details
     *      requestBody:
     *        description: User detail update object
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/UserDetails'
     *      responses:
     *         200:
     *           description: Succesful operation
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 $ref: '#/components/schemas/UserDetails'
     */
    private async update(
        options: ApiHandlerOptions<{
            body: UserDetailsUpdateRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userDetailsService.update(options.body),
        };
    }

    private async approve(
        options: ApiHandlerOptions<{
            body: UserDetailsApproveRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            // payload: await this.userDetailsService.approve(options.body),
            payload: await Promise.resolve(options.body),
        };
    }
}

export { UserDetailsController };
