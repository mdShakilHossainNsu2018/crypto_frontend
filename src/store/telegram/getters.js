/**
*
* 
* @param { TelegramState } state
* @return { string }
*/
export function getterName(state) {
    return state.data;
}

export function getTelegramLoggedIn(state){
    return state.isLoggedInToTelegram;
}


