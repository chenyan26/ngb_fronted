/**
 * Created by echo on 2016/12/21.
 */
import * as service from "../services/record";

export default {

    namespace: 'stbRecord',

    state: {
        list: [],
        loading: false,
        errorModalVisible: false,
        error: ""
    },

    subscriptions: {

    },

    effects: {

        *query({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { response, err } = yield call(service.getStbRecord, payload);
            if(err || !response){
                yield put({type:'queryFailed',payload:err.message});
            }else if(response.code == 0) {
                yield put({
                    type: 'querySuccess',
                    payload: response.data,
                });
            }else{
                yield put({type:'queryFailed', payload:response.code});
            }
        },

        *queryByNumber({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { response, err } = yield call(service.getStbReocrdByNumber, payload);
            if(err || !response){
                yield put({type:'queryByNumberFailed',payload:err.message});
                return;
            }
            if(response.code == 0) {
                yield put({
                    type: 'queryByNumberSuccess',
                    payload: response.data,
                });
            }else {
                yield put({type:'queryByNumberFailed', payload:{code:response.code}});
            }
        },
    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: true };
        },

        hideErrorModal(state) {
            return { ...state, errorModalVisible: false };
        },

        querySuccess(state, { payload }) {
            return { ...state, list: payload, loading: false};
        },
        queryFailed(state, { payload }){
            return { ...state, error: payload, loading: false, errorModalVisible: true };
        },

        queryByNumberSuccess(state, { payload }) {
            return { ...state, list: payload, loading: false};
        },
        queryByNumberFailed(state, { payload }){
            const { code } = payload;
            let msg = "";
            if (code == 1) {
                msg = "该克拉号不存在";
            }
            return { ...state, error: msg, loading: false, errorModalVisible: true };
        },
    },

}
