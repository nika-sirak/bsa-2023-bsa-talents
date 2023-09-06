import { type StyleProp, type ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text, View } from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useMemo } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { BadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';

import { styles } from './styles';

type BadgeName = ValueOf<typeof BadgeStepBadgesTitle>;

type BadgeProperties = {
    style: StyleProp<ViewStyle>;
    ending: string;
    defaultValue: number | string;
};

type Properties = {
    value?: string | number;
    badgeType: BadgeName;
    iconSize?: number;
};

const defaultIconSize = 40;

const Badge: React.FC<Properties> = ({
    badgeType,
    value,
    iconSize = defaultIconSize,
}) => {
    // TODO: replace with real data
    const badges: Record<BadgeName, BadgeProperties> = useMemo(() => {
        return {
            [BadgeStepBadgesTitle.LECTURE_SCORE]: {
                style: styles.lectureScore,
                ending: ' / 5',
                defaultValue: 4.2,
            },
            [BadgeStepBadgesTitle.PROJECT_SCORE]: {
                style: styles.projectScore,
                ending: ' / 10',
                defaultValue: 8.4,
            },
            [BadgeStepBadgesTitle.COMMUNICATION_SCORE]: {
                style: styles.communicationScore,
                ending: ' / 10',
                defaultValue: 10,
            },
            [BadgeStepBadgesTitle.TEAM_SCORE]: {
                style: styles.workingWithTeamScore,
                ending: ' / 10',
                defaultValue: 7,
            },
            [BadgeStepBadgesTitle.ENGLISH_LEVEL]: {
                style: styles.englishLevel,
                ending: '',
                defaultValue: 'B+',
            },
            [BadgeStepBadgesTitle.PUNCTUALITY]: {
                style: styles.punctuality,
                ending: ' / 10',
                defaultValue: 7,
            },
        };
    }, []);

    return (
        <View
            style={[
                globalStyles.flex1,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
                globalStyles.borderRadius9,
                globalStyles.p10,
                globalStyles.m5,
                styles.wrapper,
            ]}
        >
            <View
                style={[
                    globalStyles.p5,
                    globalStyles.borderRadius9,
                    badges[badgeType].style,
                ]}
            >
                <Icon name={IconName.HEADPHONES} size={iconSize} color="#FFF" />
            </View>
            <View style={styles.textWrapper}>
                <View style={globalStyles.flexDirectionRow}>
                    <Text category={TextCategory.H4}>
                        {value ?? badges[badgeType].defaultValue}
                    </Text>
                    <Text category={TextCategory.H4} style={styles.maxScore}>
                        {badges[badgeType].ending}
                    </Text>
                </View>
                <Text category={TextCategory.LABEL}>{badgeType}</Text>
            </View>
        </View>
    );
};

export { Badge };
