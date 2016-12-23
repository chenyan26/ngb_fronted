/**
 * Created by echo on 2016/12/12.
 */
import * as service from "../services/stb";

export default {

    namespace: 'stb',

    state: {
        list: [],
        loading: false,
        // total: null,
        // current: 1,
        currentItem: {},
        modalVisible: false,
        errorModalVisible: false,
        error: ""
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/stb') {
                    console.log('stb-------');
                    dispatch({
                        type: 'query',
                    });
                }
            });
        },
    },

    effects: {

        *query({ payload }, { call, put }) {
            yield put({
                type: 'showLoading',
            });
            const { response, err } = yield call(service.query, payload);
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

        *create({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { response, err } = yield call(service.create, payload);
            if(err || !response){
                yield put({type:'createFailed',payload:err.message});
                return;
            }
            if(response.code == 0) {
                yield put({
                    type: 'createSuccess',
                    payload: response.data,
                });
                yield put({ type: 'hideModal' });
            }else{
                let msg = "";
                /**
                 * 根据code判断错误类型并提示
                 */
                if (response.code == 1) {
                    msg = "该克拉号不存在";
                }
                yield put({type:'createFailed', payload:msg});
            }
        },

        *'delete'({ payload }, { call, put }) {
            yield put({
                type: 'showLoading'
            });
            const { response, err } = yield call(service.remove, payload);
            if(err || !response){
                yield put({type:'deleteFailed',payload:err.message});
                return;
            }
            if(response.code == 0) {
                yield put({
                    type: 'deleteSuccess',
                    payload: payload.ids,
                });
            }else{
                let msg = "";
                /**
                 * 根据code判断错误类型并提示
                 */
                if (response.code == 1) {
                    msg = "该克拉号不存在";
                }
                yield put({type:'deleteFailed', payload:msg});
            }
        }
    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: true };
        },

        showModal(state, action) {
            return { ...state, ...action.payload, modalVisible: true };
        },
        hideModal(state) {
            return { ...state, modalVisible: false };
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

        createSuccess(state, action) {
            const newList = state.list;
            newList.push(action.payload);
            return { ...state, list:newList, loading: false };
        },
        createFailed(state, { payload }){
            return { ...state, error: payload, loading: false, errorModalVisible: true};
        },

        deleteSuccess(state,  { payload }) {
            console.log("stb-reducer - deleteSuccess");
            console.log("payload:"+ payload);
            let stb = state.list;
            for (let i = 0; i < payload.length; i ++) {
                stb = stb.filter(s => s.id != payload[i]);
            }
            return { ...state, list: stb, loading: false };
        },
        deleteFailed(state, { payload }){
            return { ...state, error: payload, loading: false, errorModalVisible: true};
        },
    },

}
