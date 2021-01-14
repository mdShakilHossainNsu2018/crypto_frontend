import {SET_DATA, SET_TOKEN, SET_USER, INIT, LOGOUT} from './mutation-types';

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
        console.log("user", data)
        window.localStorage.setItem('user', JSON.stringify(data))
        // console.log(JSON.parse(window.localStorage.getItem('user')).username)
    },

    [INIT](state) {
        state.token = window.localStorage.getItem('token')
        state.user = JSON.parse(window.localStorage.getItem('user'))
        console.log(state.token)
        console.log(state.user)
    },

    [LOGOUT](state){
        window.localStorage.clear();
        state.token = null;
        state.user = null;
    }
};
