/**
 * Created by echo on 2016/12/20.
 */
import * as service from "../services/content";

export default {

    namespace: 'content',

    state: {
        list: [],
        // total: null,
        // current: 1,
        currentItem: {},
        modalVisible: false,
        newModal: true, //是否新建
        errorModalVisible: false,
        error: ""
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/content') {
                    dispatch({
                        type: 'query',
                    });
                }
            });
        },
    },

    effects: {

        *query({ payload }, { call, put }) {
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
                if (response.code == 40012) {
                    msg = "ERR_DATABASE";
                }
                yield put({type:'queryFailed', payload:msg});
            }
        },

        *create({ payload }, { call, put }) {
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
                if (response.code == 40012) {
                    msg = "ERR_DATABASE";
                }
                yield put({type:'createFailed', payload:msg});
            }
        },

        *'delete'({ payload }, { call, put }) {
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
                if (response.code == 40012) {
                    msg = "ERR_DATABASE";
                }
                yield put({type:'deleteFailed', payload:msg});
            }
        },

        *update({ payload }, { call, put }) {
            const { response, err } = yield call(service.update, payload);
            if(err || !response){
                yield put({type:'updateFailed',payload:err.message});
                return;
            }
            if(response.code == 0) {
                yield put({
                    type: 'updateSuccess',
                    payload: payload,
                });
                yield put({ type: 'hideModal' });
            }else{
                let msg = "";
                /**
                 * 根据code判断错误类型并提示
                 */
                if (response.code == 40012) {
                    msg = "ERR_DATABASE";
                }
                yield put({type:'updateFailed', payload:msg});
            }
        }
    },

    reducers: {

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
            return { ...state, list: payload};
        },
        queryFailed(state, { payload }){
            return { ...state, error: payload, errorModalVisible: true };
        },

        createSuccess(state, action) {
            const newList = state.list;
            newList.push(action.payload);
            return { ...state, list:newList };
        },
        createFailed(state, { payload }){
            return { ...state, error: payload, errorModalVisible: true };
        },

        deleteSuccess(state,  { payload }) {
            console.log("content-reducer - deleteSuccess: " + payload);
            let content = state.list;
            for (let i = 0; i < payload.length; i ++) {
                content = content.filter(s => s.id != payload[i]);
            }
            return { ...state, list: content };
        },
        deleteFailed(state, { payload }){
            return { ...state, error: payload, errorModalVisible: true };
        },

        updateSuccess(state, { payload }) {
            const newList = state.list.map(customer => {
                if (customer.id == payload.id) {
                    return { ...customer, ...payload };
                }
                return customer;
            });
            return { ...state, list: newList };
        },
        updateFailed(state, {payload}){
            return { ...state, error: payload, errorModalVisible: true };
        },
    },

}
