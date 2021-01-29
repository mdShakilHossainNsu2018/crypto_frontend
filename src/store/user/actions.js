import {
    SET_TOKEN,
    SET_USER,
    INIT,
    LOGOUT,
    SET_SNACK_BAR_DATA,
    SET_SNACK_BAR_STATE,
    SET_LOADING_STATE
} from './mutation-types';
// import {SET_SNACK_BAR_DATA, SET_SNACK_BAR_STATE} from "@/store/snackbar/mutation-types";
import axios from 'axios';



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

export function login({commit, state}, data){
    console.log("login data",data)
    commit(SET_LOADING_STATE, true)
    console.log(this.getters['baseUrl/getBaseUrl'] )
    axios.post(this.getters['baseUrl/getBaseUrl'] + 'users/auth/login/', data).then(res => {
        //  save in local
        //  fetch user info by token and save
        console.log(res)
        getUserByToken({commit, state}, res.data.key)
       commit(SET_TOKEN, res.data)
    }).catch(err => {

        commit(SET_SNACK_BAR_DATA, err.response.data)
        commit(SET_SNACK_BAR_STATE, true)
        console.log(err.response)
    }).finally(() => {
        commit(SET_LOADING_STATE, false)
    })

}

export function signup({commit, state}, data){

    axios.post(this.getters['baseUrl/getBaseUrl'] + 'users/auth/registration/', data).then(() => {
        // console.log({email: res.email, password: data.password1 })
        login({commit, state},{email: data.email, password: data.password1 })
        // console.log(res)
        // console.log(commit)
        // window.localStorage.setItem('token', res.data.key);
    }).catch(err => {
        console.log(err.response)
    })

}

export function logout({commit}){
    commit(LOGOUT)
}


export function getUserByToken({commit}, data){

    console.log(data)

    axios.post(this.getters['baseUrl/getBaseUrl'] + 'users/userbytoken/', {token: data}).then(res => {
        commit(SET_USER, res.data)
        // window.localStorage.setItem('token', res.data.key);
    }).catch(err => {
        console.log(err)
    })
}


export function setSnackBarState({commit}, data){
    commit(SET_SNACK_BAR_STATE, data)
}
