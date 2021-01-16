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

export function isStaff(state){
    if(state.user !== null){
        return state.user.is_staff;
    }
    return false;

}

export function getUser(state){
    return state.user;
}
