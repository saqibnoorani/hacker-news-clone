import { UPDATE_CHARTS, HIDE_ARTICLE } from '../actions/index';

export default (state = [], action) => {
    switch (action.type) {
        case UPDATE_CHARTS:
            return action.payload;
        case HIDE_ARTICLE:
            debugger;
            return state.filter(art => art[0] !== action.payload);
        default:
            return state;
    }
};
