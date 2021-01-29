import { SET_DATA } from './mutation-types';

export default {
    /**
    *
    * @param { BaseurlState } state
    * @param { string } data
    */
    [SET_DATA](state, { data }) {
        state.data = data;
    },
};
