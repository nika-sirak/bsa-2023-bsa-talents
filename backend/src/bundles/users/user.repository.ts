import { UserEntity } from '~/bundles/users/user.entity.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { type Repository } from '~/common/interfaces/interfaces.js';
import { tokenService } from '~/common/services/services.js';

class UserRepository implements Repository {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public async find(
        payload: Record<string, unknown>,
    ): Promise<UserEntity | undefined> {
        const user = await this.userModel.query().findOne(payload);

        return user ? UserEntity.initialize(user) : undefined;
    }

    public async findById(id: number): Promise<UserEntity | undefined> {
        return this.find({ id });
    }

    public async findByEmail(email: string): Promise<UserEntity | undefined> {
        return this.find({ email });
    }

    public async findByToken(token: string): Promise<UserEntity | undefined> {
        const decodedToken = await tokenService.decode(token);

        const user = await this.userModel
            .query()
            .findOne({ id: decodedToken.payload.id });

        return user ? UserEntity.initialize(user) : undefined;
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const { email, passwordSalt, passwordHash } = entity.toNewObject();

        const item = await this.userModel
            .query()
            .insert({
                email,
                passwordSalt,
                passwordHash,
            })
            .returning('*')
            .execute();

        return UserEntity.initialize(item);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserRepository };
