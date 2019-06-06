
import { GlobalState, NotificationDisplayType, PageNotification } from '../types';
// initial state
const state: GlobalState = {
    items: [],
    name: '',
    status: false,
    hideViewTabs: false,
    pageNotification: {
        msg: "",
        show: false
    }
}

// getters
const getters = {
    cartProducts: (state: GlobalState) => {
        return state.items;
    },
    cartTotalPrice: (state: GlobalState, getters: any) => {
        return getters.cartProducts;
    },
    isHideViewTabs: (state: GlobalState, getters: any) => {
        return state.hideViewTabs;
    },
    getPageNotification: (state: GlobalState, getters: any) => {
        return state.pageNotification;
    }
}
// actions
const actions = {
    checkout({ commit, state }, products) {
        commit('setCheckoutStatus', false);
    },

    addProductToCart({ state, commit }, product) {
        commit('setCheckoutStatus', null)
    }
}

// mutations
const mutations = {
    setCheckoutStatus(state: GlobalState, status: boolean) {
        state.status = status;
    },
    setHideViewTabs(state: GlobalState, status: boolean) {
        state.hideViewTabs = status;
    },
    setPageNotification(state: GlobalState, pageNotification: PageNotification) {
        state.pageNotification = pageNotification;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
