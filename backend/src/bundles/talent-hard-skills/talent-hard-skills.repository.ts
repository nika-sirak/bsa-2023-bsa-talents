import { ErrorMessages } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

import { TalentHardSkillsEntity } from './talent-hard-skills.entity.js';
import { type TalentHardSkillsModel } from './talent-hard-skills.model.js';
import {
    type TalentHardSkill,
    type TalentHardSkillUpdate,
} from './types/types.js';

class TalentHardSkillsRepository implements Repository {
    private talentHardSkillsModel: typeof TalentHardSkillsModel;

    public constructor(talentHardSkillsModel: typeof TalentHardSkillsModel) {
        this.talentHardSkillsModel = talentHardSkillsModel;
    }

    public findAll(): Promise<TalentHardSkillsEntity[]> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(
        talentHardSkill: TalentHardSkill,
    ): Promise<TalentHardSkillsEntity> {
        const item = await this.talentHardSkillsModel
            .query()
            .insert({
                ...talentHardSkill,
            })
            .returning('*')
            .execute();

        return TalentHardSkillsEntity.initializeNew(item);
    }

    public find(): Promise<TalentHardSkillsEntity | null> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async findHardSkillsIdsByUserDetailsId(
        userDetailsId: string,
    ): Promise<string[]> {
        const existingTalentHardSkills = await this.talentHardSkillsModel
            .query()
            .where({ userDetailsId })
            .select('hardSkillId');

        return existingTalentHardSkills.map((entry) => entry.hardSkillId);
    }

    public async update({
        userDetailsId,
        talentHardSkills,
    }: TalentHardSkillUpdate): Promise<void> {
        const existingIds = await this.findHardSkillsIdsByUserDetailsId(
            userDetailsId,
        );

        const idsToDelete = existingIds.filter(
            (id) => !talentHardSkills.includes(id),
        );
        const idsToInsert = talentHardSkills.filter(
            (id) => !existingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
            await this.deleteUnusedHardSkills(userDetailsId, idsToDelete);
        }

        if (idsToInsert.length > 0) {
            const skillsToInsert = idsToInsert.map((id) => ({
                hardSkillId: id,
                userDetailsId,
            }));
            await this.talentHardSkillsModel
                .query()
                .insert(skillsToInsert)
                .execute();
        }
    }

    public async deleteUnusedHardSkills(
        userDetailsId: string,
        idsToDelete: string[],
    ): Promise<void> {
        if (idsToDelete.length > 0) {
            await this.talentHardSkillsModel
                .query()
                .delete()
                .whereIn('hardSkillId', idsToDelete)
                .andWhere({ userDetailsId })
                .execute();
        }
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { TalentHardSkillsRepository };
