import { SET_DATA, SET_LOADING } from './mutation-types';

/**
*
* @param { function } commit
* @param { string } data
*/
export function setData({ commit }, { data }) {
    commit(SET_DATA, { data });
}


export function setLoadingState({ commit }, data ) {
    commit(SET_LOADING, data );
}
