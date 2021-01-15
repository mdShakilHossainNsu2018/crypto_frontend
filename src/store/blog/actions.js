import { SET_DATA, SET_BLOG } from './mutation-types';
import axios from 'axios';

/**
*
* @param { function } commit
* @param { string } data
*/
export function setData({ commit }, { data }) {
    commit(SET_DATA, { data });
}

export function fetchCategories({state}){
    axios.get(state.baseUrl+ 'blog/category/').then(res=> {
        console.log(res)
        state.categories = res.data;
    }).catch(err => {
        console.log(err.response)
    })
}


export function postBlog({state}, data){
    axios.post(state.baseUrl+'blog/', data, {
        headers: {
            // "Content-Type": "ma",
        }
    }).then(res=> {
        console.log(res)
    }).catch(err => {
        console.log(err.response)
    })
}

export function fetchBlog({state, commit}){
    axios.get(state.baseUrl+'blog/',).then(res=> {
        console.log(res)
        commit(SET_BLOG, res.data)
    }).catch(err => {
        console.log(err.response)
    })
}
