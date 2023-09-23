import React from 'react';

import {
    Badge,
    Button,
    Tag,
    Text,
    View,
} from '~/bundles/common/components/components';
import { BadgeSize, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type BadgesItem } from '~/bundles/common/types/types';
import { type FormattedHardSkillsItem } from '~/bundles/common-data/types/types';
import { type UserDetailsResponseDto } from '~/bundles/employer/types/types';

import { CardConstants } from './constants/constants';
import { styles } from './styles';

const { MAX_CHAR_COUNT, MAX_SKILLS, MAX_BADGES } = CardConstants;

const getBadgeById = (data: BadgesItem[], id: string): BadgesItem => {
    return data.find((value) => value.id === id) as BadgesItem;
};

const getHardSkillByValue = (
    data: FormattedHardSkillsItem[],
    id: string,
): FormattedHardSkillsItem => {
    return data.find(({ value }) => value === id) as FormattedHardSkillsItem;
};

const CandidateCard: React.FC<UserDetailsResponseDto> = ({
    userId,
    fullName,
    salaryExpectation,
    jobTitle,
    location,
    experienceYears,
    englishLevel,
    description,
    talentBadges,
    talentHardSkills,
}) => {
    const { badgesData, hardSkillsData } = useAppSelector(
        ({ commonData }) => commonData,
    );

    if (!badgesData || !hardSkillsData) {
        return null;
    }
    return (
        <View
            style={[
                styles.container,
                globalStyles.mt15,
                globalStyles.mh15,
                globalStyles.borderRadius10,
            ]}
        >
            <View style={[globalStyles.pv20, globalStyles.ph15]}>
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentSpaceBetween,
                    ]}
                >
                    <View>
                        <Text category={TextCategory.H5}>{fullName}</Text>
                        <Text category={TextCategory.H5} style={styles.title}>
                            {jobTitle}
                        </Text>
                    </View>

                    <Text category={TextCategory.H5} style={styles.salary}>
                        ${salaryExpectation}
                    </Text>
                </View>
                <View style={globalStyles.mt5}>
                    <Text
                        category={TextCategory.CAPTION}
                        style={styles.supportingText}
                    >
                        {location} | {experienceYears} year(s) of experience |
                    </Text>
                    <Text
                        category={TextCategory.CAPTION}
                        style={styles.supportingText}
                    >
                        {
                            englishLevel // TODO: add submitted at after fix backend
                        }
                    </Text>
                </View>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <View
                style={[
                    globalStyles.pv20,
                    globalStyles.ph15,
                    globalStyles.flexDirectionRow,
                    styles.badgeContainer,
                ]}
            >
                {talentBadges
                    .slice(0, MAX_BADGES)
                    .map(
                        ({ level, score, badgeId, isShown }) =>
                            isShown && (
                                <Badge
                                    key={badgeId}
                                    size={BadgeSize.SMALL}
                                    iconSize={20}
                                    score={score}
                                    level={level}
                                    badge={getBadgeById(
                                        badgesData.items,
                                        badgeId,
                                    )}
                                />
                            ),
                    )}
            </View>
            <View
                style={[
                    styles.skills,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                    globalStyles.pb20,
                    globalStyles.ph15,
                ]}
            >
                <Text
                    category={TextCategory.BUTTON}
                    style={[styles.skillsLabel]}
                >
                    Skills
                </Text>

                {talentHardSkills
                    // TODO: Replace value with common data from store and remove chain after fix backend
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    ?.slice(0, MAX_SKILLS)
                    .map(({ hardSkillId }) => (
                        <Tag
                            key={hardSkillId}
                            value={
                                getHardSkillByValue(
                                    hardSkillsData.items,
                                    hardSkillId,
                                ).label
                            }
                        />
                    ))}
            </View>
            <View style={[globalStyles.pb20, globalStyles.ph15]}>
                <Text category={TextCategory.BODY1}>
                    {description?.slice(0, MAX_CHAR_COUNT)}...
                </Text>
            </View>
            <View style={[styles.divider, globalStyles.width100]} />
            <Button
                label="Read more"
                style={[globalStyles.alignSelfFlexEnd, globalStyles.m10]}
                onPress={(): string => userId} // TODO redirect to certain candidate
            />
        </View>
    );
};

export { CandidateCard };
