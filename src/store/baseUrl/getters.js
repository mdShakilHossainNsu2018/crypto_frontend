/**
*
* 
* @param { BaseurlState } state
* @return { string }
*/
export function getterName(state) {
    return state.data;
}

export function getBaseUrl(state){
    return state.baseUrl;
}
