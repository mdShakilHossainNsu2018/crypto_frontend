import { SET_DATA, SET_LOADING } from './mutation-types';

export default {
    /**
    *
    * @param { LoadingStateState } state
    * @param { string } data
    */
    [SET_DATA](state, { data }) {
        state.data = data;
    },

    [SET_LOADING](state, data){
        state.isLoading = data;
    }
};
