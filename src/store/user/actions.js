import {SET_DATA, SET_TOKEN, SET_USER, INIT, LOGOUT} from './mutation-types';
import axios from 'axios';



/**
*
* @param { function } commit
* @param { string } data
*/
export function setData({ commit }, { data }) {
    commit(SET_DATA, { data });
}

export function init({commit}){
    commit(INIT)
}

export function login({commit, state}, data){

    axios.post(state.baseUrl+'users/auth/login/', data).then(res => {
        //  save in local
        //  fetch user info by token and save
        getUserByToken({commit, state}, res.data.key)
       commit(SET_TOKEN, res.data)
    }).catch(err => {
        console.log(err.response)
    })

}

export function signup({commit, state}, data){

    axios.post(state.baseUrl+'users/auth/registration/', data).then(() => {
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


export function getUserByToken({commit, state}, data){

    axios.post(state.baseUrl+'users/userbytoken/', {token: data}).then(res => {
        commit(SET_USER, res.data)
        // window.localStorage.setItem('token', res.data.key);
    }).catch(err => {
        console.log(err)
    })
}
