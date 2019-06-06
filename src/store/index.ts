
import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// https://codeburst.io/vuex-and-typescript-3427ba78cfa8
export default new Vuex.Store({
    modules: {
        global
    },
    strict: debug
})
