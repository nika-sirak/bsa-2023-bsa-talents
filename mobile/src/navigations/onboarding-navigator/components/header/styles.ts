import { StyleSheet } from 'react-native';

import { Color } from '~/bundles/common/enums/enums';

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.TEXT,
        height: 100,
    },
    icon: {
        position: 'absolute',
        color: '#fff',
        left: 20,
    },
    title: {
        color: '#fff',
    },
    steps: {
        width: 68,
        height: 68,
        borderRadius: 100,
        backgroundColor: '#d6dce8',
        position: 'absolute',
        right: 10,
    },
    stepsText: {
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});

export { styles };
