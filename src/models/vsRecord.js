/**
 * Created by echo on 2016/12/23.
 */
import * as service from "../services/record";

export default {

    namespace: 'vsRecord',

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
            const { response, err } = yield call(service.getVsRecord, payload);
            if(err || !response){
                yield put({type:'queryFailed',payload:err.message});
                return;
            }
            if(response.code == 0) {
                yield put({
                    type: 'querySuccess',
                    payload: response.data,
                });
            }else{
                let msg = "";
                /**
                 * 根据code判断错误类型并提示
                 */
                if (response.code == 1) {
                    msg = "该克拉号不存在";
                }
                yield put({type:'queryFailed', payload:msg});
            }
        },

        *queryByNumber({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { response, err } = yield call(service.getVsRecordByNumber, payload);
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
                let msg = "";
                /**
                 * 根据code判断错误类型并提示
                 */
                if (response.code == 1) {
                    msg = "该克拉号不存在";
                }
                yield put({type:'queryByNumberFailed', payload:msg});
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
            return { ...state, error: payload, loading: false, errorModalVisible: true };
        },
    },

}
