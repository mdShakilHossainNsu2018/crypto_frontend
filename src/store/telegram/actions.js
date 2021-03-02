import {SET_DATA, SET_TELEGRAM_LOGGED_IN_STATUS} from './mutation-types';
import axios from 'axios';
// import router from '@/router';

/**
 *
 * @param { function } commit
 * @param { string } data
 */
export function setData({commit}, {data}) {
    commit(SET_DATA, {data});
}

// eslint-disable-next-line no-unused-vars
// export function addToTelegramContact({state}, data) {
//     axios.post(this.getters['baseUrl/getBaseUrl'] + 'telegram/create_user_info/', data, {
//         headers: {
//             // 'Content-Type': 'application/json',
//             'Authorization': 'Token ' + this.getters['user/getToken'],
//         }
//     }).then(response => {
//         console.log(response.data)
//     }).catch(error => console.log(error))
// }


// export function deleteContact() {
//     console.log("delete contact");
//
//     axios.delete(this.getters['baseUrl/getBaseUrl'] + 'telegram/delete_contact/', {
//         headers: {
//             // 'Content-Type': 'application/json',
//             'Authorization': 'Token ' + this.getters['user/getToken'],
//         }
//     }).then(response => {
//         console.log(response.data);
//
//     }).catch(error => console.log(error))
// }


// export function enableTelegram() {
//     // enable_telegram
//
//     axios.post(this.getters['baseUrl/getBaseUrl'] + 'telegram/enable_telegram/', {}, {
//         headers: {
//             // 'Content-Type': 'application/json',
//             'Authorization': 'Token ' + this.getters['user/getToken'],
//         }
//     }).then(response => {
//         console.log(response.data)
//         window.location.reload();
//     }).catch(error => console.log(error))
//
// }


// export function disableTelegram() {
//     // disable_telegram
//
//
//     axios.post(this.getters['baseUrl/getBaseUrl'] + 'telegram/disable_telegram/', {}, {
//         headers: {
//             // 'Content-Type': 'application/json',
//             'Authorization': 'Token ' + this.getters['user/getToken'],
//         }
//     }).then(response => {
//         console.log(response.data)
//         window.location.reload()
//         // this.userInfo = response.data;
//
//     }).catch(error => console.log(error))
//
// }


export function set_TELEGRAM_LOGGED_IN_STATUS({commit}, data){
    commit(SET_TELEGRAM_LOGGED_IN_STATUS, data)
}


// export function isLoggedInToTelegram({commit}) {
//     // http://localhost:8000/api/telegram/telegram_login_status/
//     axios.get(this.getters['baseUrl/getBaseUrl'] + 'telegram/telegram_login_status/').then(response => {
//         commit(SET_TELEGRAM_LOGGED_IN_STATUS, response.data)
//     }).catch(error => console.log(error))
// }


export function requestForVerificationCode(data) {
    // http://localhost:8000/api/telegram/request_telegram_code/
    axios.post(this.getters['baseUrl/getBaseUrl'] + 'telegram/request_telegram_code/', data, {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.getters['user/getToken'],
        }
    }).then(res => {
        console.log(res)
    }).catch(error => console.log(error))
}



