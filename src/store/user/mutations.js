import {
    SET_DATA,
    SET_TOKEN,
    SET_USER,
    INIT,
    LOGOUT,
    SET_SNACK_BAR_DATA,
    SET_SNACK_BAR_STATE,
    SET_LOADING_STATE
} from './mutation-types';


export default {
    /**
    *
    * @param { UserState } state
    * @param { string } data
    */
    [SET_DATA](state, { data }) {
        state.data = data;
    },

    [SET_TOKEN](state, data){
        state.token = data.key;
        window.localStorage.setItem('token', data.key)
    },
    [SET_USER](state, data){
        state.user =  data;
        window.localStorage.setItem('user', JSON.stringify(data))
        // console.log(JSON.parse(window.localStorage.getItem('user')).username)
    },

    [INIT](state) {
        state.token = window.localStorage.getItem('token')
        state.user = JSON.parse(window.localStorage.getItem('user'))
    },

    [LOGOUT](state){
        window.localStorage.clear();
        state.token = null;
        state.user = null;
    },


    [SET_SNACK_BAR_DATA](state, data ) {
        state.snackbarData = data;
    },

    [SET_SNACK_BAR_STATE](state, data){
        state.snackbarState = data;
    },

    [SET_LOADING_STATE](state, data){
        state.loadingState = data;
    }
};
