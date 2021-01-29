/**
*
* 
* @param { LoadingStateState } state
* @return { string }
*/
export function getterName(state) {
    return state.data;
}

export function getLoadingState(state){
    return state.isLoading;
}
