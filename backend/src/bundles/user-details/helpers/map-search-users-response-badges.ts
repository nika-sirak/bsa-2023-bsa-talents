import { TalentBadgeEntity } from '~/bundles/talent-badges/talent-badge.entity.js';

import { type UserDetailsResponseBadgeDto } from '../types/types.js';
import { type UserDetailsModel } from '../user-details.model.js';

const mapSearchUsersResponseBadges = (
    user: UserDetailsModel,
): UserDetailsResponseBadgeDto[] | null => {
    const talentBadges = user.talentBadges.map((badge) => {
        if (badge.badge) {
            return TalentBadgeEntity.initialize({
                id: badge.id,
                userId: badge.userId,
                score: badge.score,
                level: badge.level,
                badgeId: badge.badgeId,
                isShown: badge.isShown,
                userDetailsId: badge.userDetailsId,
                badge: badge.badge,
            }).toObject();
        }
    });

    const formattedBadges = talentBadges.map((item) => {
        if (item) {
            const itemBSABadge = item.badge?.toObject();
            return {
                id: item.id,
                userId: item.userId,
                score: item.score,
                level: item.level,
                badgeId: item.badgeId,
                isShown: item.isShown,
                userDetailsId: item.userDetailsId,
                type: itemBSABadge?.type ?? null,
                name: itemBSABadge?.name ?? null,
                maxScore: itemBSABadge?.maxScore ?? null,
            };
        }
    });

    const filteredBadges = formattedBadges.filter(
        Boolean,
    ) as UserDetailsResponseBadgeDto[];

    if (filteredBadges.length === 0) {
        return null;
    }

    return filteredBadges;
};

export { mapSearchUsersResponseBadges };
