/**
 * Created by echo on 2016/12/20.
 */
import * as service from "../services/account";

export default {

    namespace: 'account',

    state: {
        stbList: [],
        mobileList: [],
        loading: false,
        // currentItem: {},
        errorModalVisible: false,
        error: ""
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/stb_account') {
                    console.log('stb_account-------');
                    dispatch({
                        type: 'query',
                        payload: {type: 1}
                    });
                } else if (pathname === '/mobile_account') {
                    console.log('mobile_account-------');
                    dispatch({
                        type: 'query',
                        payload: {type: 0}
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
                    payload: {
                        data: response.data,
                        type: payload.type
                    }
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

        *'delete'({ payload }, { call, put }) {
            yield put({
                type: 'showLoading'
            });
            const { response, err } = yield call(service.remove, {ids:payload.ids});
            if(err || !response){
                yield put({type:'deleteFailed',payload:err.message});
                return;
            }
            if(response.code == 0) {
                yield put({
                    type: 'deleteSuccess',
                    payload: payload,
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
        }
    },

    reducers: {
        showLoading(state) {
            return { ...state, loading: true };
        },

        hideErrorModal(state) {
            return { ...state, errorModalVisible: false };
        },

        querySuccess(state, { payload }) {
            let qList = [];
            payload.data.map((obj) => {
                qList.push({
                    id: obj.id,
                    number: obj.number,
                    register_date: obj.registerDate,
                    lately_date: obj.latelyDate})
            });
            if (payload.type == 1) { //机顶盒
                return {...state, stbList: qList, loading: false};
            } else {
                return {...state, mobileList: qList, loading: false};
            }
        },
        queryFailed(state, { payload }){
            return { ...state, error: payload, loading: false, errorModalVisible: true };
        },

        deleteSuccess(state,  { payload }) {
            console.log("account-reducer - deleteSuccess");
            const ids = payload.ids;
            if (payload.type == 1) {
                let acc = state.stbList;
                for (let i = 0; i < ids.length; i ++) {
                    acc = acc.filter(s => s.id != ids[i]);
                }
                return { ...state, stbList: acc, loading: false };
            } else {
                let acc = state.mobileList;
                for (let i = 0; i < ids.length; i ++) {
                    acc = acc.filter(s => s.id != ids[i]);
                }
                return { ...state, mobileList: acc, loading: false };
            }
        },
        deleteFailed(state, { payload }){
            return { ...state, error: payload, loading: false, errorModalVisible: true};
        },
    },

}
