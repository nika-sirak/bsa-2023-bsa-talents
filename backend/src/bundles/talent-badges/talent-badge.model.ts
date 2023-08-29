import { Model, type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/packages/database/database.js';

import { BSABadgesModel } from '../bsa-badges/bsa-badge.model.js';

class TalentBadgeModel extends AbstractModel {
    public 'userEmail': string;

    public 'score': number | null;

    public 'level': string | null;

    public 'isShown': boolean;

    public 'badgeId': string;

    public 'userDetailsId': string | null;

    public static override get tableName(): string {
        return DatabaseTableName.TALENT_BADGES;
    }

    public static get relationMappings(): RelationMappings {
        return {
            badge: {
                relation: Model.BelongsToOneRelation,
                modelClass: BSABadgesModel,
                join: {
                    from: `${DatabaseTableName.TALENT_BADGES}.badgeId`,
                    to: `${DatabaseTableName.BSA_BADGES}.id`,
                },
            },
        };
    }
}

export { TalentBadgeModel };
