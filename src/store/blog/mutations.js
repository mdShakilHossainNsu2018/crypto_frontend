import { SET_DATA, SET_CATEGORY, SET_BLOG } from './mutation-types';

export default {
    /**
    *
    * @param { BlogState } state
    * @param { string } data
    */
    [SET_DATA](state, { data }) {
        state.data = data;
    },

    [SET_CATEGORY](state, data){
        state.categories = data;
    },

    [SET_BLOG](state, data){
        state.blogs = data;
    }
};
