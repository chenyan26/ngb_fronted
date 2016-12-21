/**
 * Created by echo on 2016/12/21.
 */

export default {

    namespace: 'container',

    state: {
        errorModalVisible: false,
        error: ""
    },

    subscriptions: {

    },

    effects: {

    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: true };
        },

        showErrorModal(state, { payload }) {
            return { ...state, errorModalVisible: true, error: payload };
        },

        hideErrorModal(state) {
            return { ...state, errorModalVisible: false };
        },

    },

}
