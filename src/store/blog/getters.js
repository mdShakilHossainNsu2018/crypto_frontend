/**
*
* 
* @param { BlogState } state
* @return { string }
*/
export function getterName(state) {
    return state.data;
}

export function getCategories(state){
    return state.categories;
}

export function getBlogs(state){
    return state.blogs;
}

