import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';

import * as service from "../services/individual";

export default {

  namespace: 'individual',

  state: {
    list: [],
    loading: false,
    // total: null,
    // current: 1,
    currentItem: {},
    modalVisible: false,
    newModal: true,
  },

  subscriptions: {

  },

  effects: {

    *query({ payload }, { call, put }) {
      yield put({
        type: 'showLoading',
      });
      const { response, err } = yield call(service.query, payload);
      if(err || !response){
        yield put({type:'queryFailed',payload:err.message});
      }else if(response.ok) {
        yield put({
          type: 'querySuccess',
          payload: response.data,
        });
        // yield put(routerRedux.push('/login'));
      }else{
        yield put({type:'queryFailed', payload:response.err});
      }
    },

    *'delete'({ payload }, { call, put }) {
      yield put({
          type: 'showLoading'
      });
      const { response, err } = yield call(service.remove, { id: payload });
      if(err || !response){
        yield put({type:'deleteFailed',payload:err.message});
      }else if(response.ok) {
        yield put({
          type: 'deleteSuccess',
          payload,
        });
        // yield put(routerRedux.push('/login'));
      }else{
        yield put({type:'deleteFailed', payload:response.err});
      }
    },

/*
    *create({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          },
        });
      }
    },
    /*
    *update({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = { ...payload, id };
      const { data } = yield call(update, newUser);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newUser,
        });
      }
    },
    */

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

    querySuccess(state, { payload }) {
      // console.log(`reducer - querySuccess: ${payload}`);
      return { ...state, list: payload, loading: false};
    },

    queryFailed(state, { payload }){
      return { ...state, error: payload, loading: false};
    },
/*
    createSuccess(state, action) {
      // const newUser = action.payload;
      return { ...state, ...action.payload, loading: false };
    },
    */
    deleteSuccess(state, action) {
      const id = action.payload;
      console.log(`reducer - deleteSuccess: ${id}`);
      const newList = state.list.filter(item => item.id !== id);
      return { ...state, list: newList, loading: false };
    },
    deleteFailed(state, { payload }){
      return { ...state, error: payload, loading: false};
    },
      /*
    updateSuccess(state, action) {
      const updateUser = action.payload;
      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser };
        }
        return user;
      });
      return { ...state, list: newList, loading: false };
    }, */

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
