/**
 * Created by echo on 2016/12/23.
 */
import * as service from "../services/record";

export default {

    namespace: 'vsRecord',

    state: {
        list: [],
        errorModalVisible: false,
        error: ""
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/vs_record') {
                    dispatch({
                        type: 'query',
                    });
                }
            });
        },
    },

    effects: {

        *query({ payload }, { call, put }) {
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
                if (response.code == 40012) {
                    msg = "ERR_DATABASE";
                }
                yield put({type:'queryFailed', payload:msg});
            }
        },

        *queryByNumber({ payload }, { call, put }) {
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
                if (response.code == 40012) {
                    msg = "ERR_DATABASE";
                }
                yield put({type:'queryByNumberFailed', payload:msg});
            }
        },
    },

    reducers: {

        hideErrorModal(state) {
            return { ...state, errorModalVisible: false };
        },

        querySuccess(state, { payload }) {
            return { ...state, list: payload };
        },
        queryFailed(state, { payload }){
            return { ...state, error: payload, errorModalVisible: true };
        },

        queryByNumberSuccess(state, { payload }) {
            return { ...state, list: payload };
        },
        queryByNumberFailed(state, { payload }){
            return { ...state, error: payload, errorModalVisible: true };
        },
    },

}

