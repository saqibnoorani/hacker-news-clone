import { UPDATE_CHARTS } from '../actions/index';

export default (state = [], action) => {
    switch (action.type) {
        case UPDATE_CHARTS:
            return action.payload;

        default:
            return state;
    }
};
