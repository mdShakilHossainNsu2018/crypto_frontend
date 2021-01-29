/**
*
* 
* @param { PaymentState } state
* @return { string }
*/
export function getterName(state) {
    return state.data;
}

export function getPaymentStatus(state){
    return state.paymentStatus;
}

export function isSubscriber(state){
    return state.paymentStatus !== null;
}
