import {CANCEL_SUBSCRIPTION, SET_DATA, SET_PAYMENT_STATUS} from './mutation-types';
import axios from 'axios';
/**
 *
 * @param { function } commit
 * @param { string } data
 */
export function setData({commit}, {data}) {
    commit(SET_DATA, {data});
}

export function fetchSubscription({state, commit}) {
    axios.get(state.baseURL+'payment/get-user-detail/',
        {
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': 'Token ' + this.getters['user/getToken'],
            }
        },
    ).then(res => {
        console.log(res)
        commit(SET_PAYMENT_STATUS, res.data)
    }).catch(err => {
        console.log(err.response)
    })

}

export function cancelSubscription({state, commit}){
    axios.post(state.baseURL + 'payment/cancel-sub/',{},
        {
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': 'Token '+ this.getters['user/getToken'],
            }
        },
    ).then(res => {
        console.log(res);
        commit(CANCEL_SUBSCRIPTION);
    }).catch(err=> {
        console.log(err.response)
    })
}
