import { SET_DATA, SET_PAYMENT_STATUS, CANCEL_SUBSCRIPTION } from './mutation-types';

export default {
    /**
    *
    * @param { PaymentState } state
    * @param { string } data
    */
    [SET_DATA](state, { data }) {
        state.data = data;
    },
    [SET_PAYMENT_STATUS](state, data){
        state.paymentStatus = data
    },

    [CANCEL_SUBSCRIPTION](state){
        state.paymentStatus = null;
    }
};
