import { SET_DATA, SET_BLOG, SET_CATEGORY } from './mutation-types';
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
    axios.get(this.getters['baseUrl/getBaseUrl'] +  'blog/category/').then(res=> {
        console.log(res)
        state.categories = res.data;
    }).catch(err => {
        console.log(err.response)
    })
}

export function setCategories({commit}, data){
    commit(SET_CATEGORY, data)
}


// export function postBlog( data){
//     axios.post(this.getters['baseUrl/getBaseUrl'] + 'blog/', data, {
//         headers: {
//             // "Content-Type": "ma",
//         }
//     }).then(res=> {
//         console.log(res)
//     }).catch(err => {
//         console.log(err.response)
//     })
// }

export function setBlog({commit}, data){
    commit(SET_BLOG, data)
}

// export function fetchBlog({ commit}){
//     axios.get(this.getters['baseUrl/getBaseUrl'] + 'blog/',).then(res=> {
//         console.log(res)
//         commit(SET_BLOG, res.data)
//     }).catch(err => {
//         console.log(err.response)
//     })
// }
