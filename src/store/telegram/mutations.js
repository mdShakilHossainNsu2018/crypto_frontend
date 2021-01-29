import { SET_DATA, SET_TELEGRAM_LOGGED_IN_STATUS } from './mutation-types';

export default {
    /**
    *
    * @param { TelegramState } state
    * @param { string } data
    */
    [SET_DATA](state, { data }) {
        state.data = data;
    },

    [SET_TELEGRAM_LOGGED_IN_STATUS](state, data){
        state.isLoggedInToTelegram = data.isLoggedIn;
    }

};
