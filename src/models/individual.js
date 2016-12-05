import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';

import * as service from "../services/individual";

export default {

  namespace: 'individual',

  state: {
    list: []
    // loading: false,
    // total: null,
    // current: 1,
    // currentItem: {},
    // modalVisible: false,
    // modalType: 'create',
  },

  subscriptions: {

  },

  effects: {

    *query({ payload }, { call, put }) {

      const { response, err } = yield call(service.query, payload);
      if(err || !response){
        yield put({type:'queryFailed',payload:err.message});
      }else if(response.ok) {
        console.log(`${response.data}`);
        yield put({
          type: 'querySuccess',
          payload: response.data,
        });
        // yield put(routerRedux.push('/login'));
      }else{
        yield put({type:'queryFailed',payload:response.err});
      }
    }

  },

  reducers: {
    querySuccess(state, { payload }) {
      console.log(`reducer - querySuccess: ${payload}`);
      return { ...state, list: payload};
    },

    queryFailed(state, { payload }){
      return { ...state, error: payload };
    },

    /*
    loginFailed(state, {payload}){
      return { ...state, id: null, name: null, role: null, error: payload };
    },

    logoutSuccess(state, {payload}){
      //console.log(`reducer - logoutSuccess: ${state.user}`);
      return {...state, id: null, name: null, role: null };
    }
    */

  },

}
