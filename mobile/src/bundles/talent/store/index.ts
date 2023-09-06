import { completeProfileStep } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    completeProfileStep,
};

export { allActions as actions };
export { reducer } from './slice';
