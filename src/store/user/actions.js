import {
    SET_TOKEN,
    // eslint-disable-next-line no-unused-vars
    SET_USER,
    INIT,
    LOGOUT,
    SET_SNACK_BAR_DATA,
    SET_SNACK_BAR_STATE,
    SET_LOADING_STATE
} from './mutation-types';
// import {SET_SNACK_BAR_DATA, SET_SNACK_BAR_STATE} from "@/store/snackbar/mutation-types";
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

// eslint-disable-next-line no-unused-vars
export function login({commit, state}, data){
    // console.log("login data",data)
    commit(SET_LOADING_STATE, true)
    // https://enigmatic-atoll-64574.herokuapp.com/api/
    // console.log(this.getters['baseUrl/getBaseUrl'] )
    // http://164.90.135.73:8000/api/crypto/
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
        commit(SET_LOADING_STATE, false)

        getUserByToken({commit, state}, state.token)

    })

}

export function signup({commit, state}, data){

    axios.post('https://backend.ovexbroker.co.za/api/' + 'users/auth/registration/', data).then(() => {
        // console.log({email: res.email, password: data.password1 })

        // console.log(res)
        // console.log(commit)
        // window.localStorage.setItem('token', res.data.key);
    }).catch(err => {
        console.log(err.response)
    }).finally(()=>{
        login({commit, state},{email: data.email, password: data.password1 } )
    })

}

export function logout({commit}){
    commit(LOGOUT)
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


export function setSnackBarState({commit}, data){
    commit(SET_SNACK_BAR_STATE, data)
}
