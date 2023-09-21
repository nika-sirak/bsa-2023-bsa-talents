import { Color, FontFamily } from '~/bundles/common/enums/enums';
import { StyleSheet } from '~/bundles/common/styles/styles';

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
    },
    supportingText: {
        color: Color.TEXTDARK,
    },
    link: {
        color: Color.PRIMARY,
        fontFamily: FontFamily.INTER_BOLD,
    },
    radioButtons: {
        gap: 20,
    },
    hiredButton: {
        width: '70%',
    },
});

export { styles };
