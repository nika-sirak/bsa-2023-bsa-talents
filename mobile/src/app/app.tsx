import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React, { type FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as StoreProvider } from 'react-redux';

import { globalStyles } from '~/bundles/common/styles/global-styles';
import { store } from '~/framework/store/store';
import { Root as RootNavigation } from '~/navigations/navigations';

const App: FC = () => {
    return (
        <StoreProvider store={store.instance}>
            <GestureHandlerRootView style={globalStyles.flex1}>
                <NavigationContainer>
                    <RootNavigation />
                </NavigationContainer>
            </GestureHandlerRootView>
        </StoreProvider>
    );
};

export { App };
