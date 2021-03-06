import {CANCEL_SUBSCRIPTION, SET_DATA, SET_PAYMENT_STATUS} from './mutation-types';

/**
 *
 * @param { function } commit
 * @param { string } data
 */
export function setData({commit}, {data}) {
    commit(SET_DATA, {data});
}

export function setPaymentStatus({commit}, data){
    commit(SET_PAYMENT_STATUS, data)
}

// export function fetchSubscription({ commit}) {
//     axios.get(this.getters['baseUrl/getBaseUrl'] + 'payment/get-user-detail/',
//         {
//             headers: {
//                 // 'Content-Type': 'application/json',
//                 'Authorization': 'Token ' + this.getters['user/getToken'],
//             }
//         },
//     ).then(res => {
//         console.log(res)
//         commit(SET_PAYMENT_STATUS, res.data)
//     }).catch(err => {
//         commit(SET_PAYMENT_STATUS, null)
//         console.log(err.response)
//     })
//
// }


export function setCancelSubscription({commit}){
    commit(CANCEL_SUBSCRIPTION)
}

// export function cancelSubscription({ commit}){
//     axios.post(this.getters['baseUrl/getBaseUrl'] +  'payment/cancel-sub/',{},
//         {
//             headers: {
//                 // 'Content-Type': 'application/json',
//                 'Authorization': 'Token '+ this.getters['user/getToken'],
//             }
//         },
//     ).then(res => {
//         console.log(res);
//         commit(CANCEL_SUBSCRIPTION);
//     }).catch(err=> {
//         console.log(err.response)
//     })
// }
