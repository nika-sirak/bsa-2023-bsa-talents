import { type AnyAction } from '@reduxjs/toolkit';
import EnvConfig from 'react-native-config';
import { type Middleware } from 'redux';
import { io } from 'socket.io-client';

import { actions as chatActions } from '~/bundles/chat/store';
import { SocketEvent } from '~/framework/storage/enums/enums';
import { type store } from '~/framework/store/store';

type Properties = {
    dispatch: typeof store.instance.dispatch;
};

const socketMiddleware: Middleware = ({ dispatch }: Properties) => {
    const socket = io(EnvConfig.API_URL as string);

    socket.on(SocketEvent.GET_MESSAGE, (message) => {
        void dispatch(chatActions.addMessage(message));
    });

    return (next) => (action: AnyAction) => {
        if (action.test(chatActions.joinRoom)) {
            socket.emit(SocketEvent.JOIN_ROOM, action.payload);
        }
        if (action.test(chatActions.leaveRoom)) {
            socket.emit(SocketEvent.LEAVE_ROOM, action.payload);
        }

        if (action.test(chatActions.createMessage.fulfilled)) {
            socket.emit(SocketEvent.SEND_MESSAGE, action.payload);
        }
        return next(action);
    };
};

export { socketMiddleware };
