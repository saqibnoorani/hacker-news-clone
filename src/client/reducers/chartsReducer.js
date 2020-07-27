import { UPDATE_CHARTS, HIDE_ARTICLE, UPDATE_POINTS_CHART } from '../actions/index';

export default (state = [], action) => {
    switch (action.type) {
        case UPDATE_CHARTS:
            return action.payload;
        case HIDE_ARTICLE:
            return state.filter(art => art[0] !== action.payload);
        case UPDATE_POINTS_CHART:
            const index = state.findIndex(art => art[0] == action.payload.objectID);
            debugger;
            state[index][1] += 1;
            return [...state];
        default:
            return state;
    }
};
