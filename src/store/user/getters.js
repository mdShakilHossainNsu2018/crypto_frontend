/**
*
* 
* @param { UserState } state
* @return { string }
*/
export function getterName(state) {
    return state.data;
}

export function getterBaseUrl(state){
    return state.baseUrl;
}

export function getToken(state){
    return state.token;
}

export function isAuthenticated(state){
    return state.token !== null;
}