import {
    SET_TOKEN,
    // eslint-disable-next-line no-unused-vars
    SET_USER,
    INIT,
    LOGOUT,
    SET_SNACK_BAR_DATA,
    SET_SNACK_BAR_STATE,
} from './mutation-types';
// import {SET_LOADING} from "@/store/loadingState/mutation-types";
import axios from 'axios';
import router from '@/router';

/**
*
* @param { function } commit
* @param { string } data
*/
// export function setData({ commit }, { data }) {
//     commit(SET_DATA, { data });
// }

export function init({commit}){
    commit(INIT)
}

export function setToken({commit}, data){
    commit(SET_TOKEN, data)
}

export function setSnackBarData({commit}, data){
    commit(SET_SNACK_BAR_DATA, data)
}

export function setSnackBarState({commit}, data){
    commit(SET_SNACK_BAR_STATE, data)
}


export function logout({commit}){
    commit(LOGOUT)
    window.location.href = "http://ovexbroker.co.za/"
    // router.push('http://ovexbroker.co.za/');
}


// eslint-disable-next-line no-unused-vars
export function login({commit, state}, data){
    axios.post('https://backend.ovexbroker.co.za/api/' + 'users/auth/login/', data).then(res => {
        //  save in local
        //  fetch user info by token and save
        // console.log(res)

       commit(SET_TOKEN, res.data)
        router.push('/dashboard');
    }).catch(err => {

        if (err.response){
            commit(SET_SNACK_BAR_DATA, err.response)
            commit(SET_SNACK_BAR_STATE, true)
        }


        console.log('error',err.response)
    }).finally(() => {

        getUserByToken({commit, state}, state.token)

    })

}

// eslint-disable-next-line no-unused-vars
export function getUserByToken({commit, state}, data){

    // console.log("Data: ",data)
    const TOKEN = {
        token: data
    }

    axios.post('https://backend.ovexbroker.co.za/api/' + 'users/userbytoken/', TOKEN).then(res => {
        console.log('from token',res)
        commit(SET_USER, res.data)
        // window.localStorage.setItem('token', res.data.key);
    }).catch(err => {
        console.log(err)
    })
}
