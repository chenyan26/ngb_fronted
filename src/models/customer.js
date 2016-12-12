import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';

import * as service from "../services/customer";

export default {

  namespace: 'customer',

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
      const { response, err } = yield call(service.remove, payload);
      if(err || !response){
        yield put({type:'deleteFailed',payload:err.message});
      }else if(response.ok) {
        yield put({
          type: 'deleteSuccess',
          payload: response.data,
        });
        // yield put(routerRedux.push('/login'));
      }else{
        yield put({type:'deleteFailed', payload:response.err});
      }
    },

    *create({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { response, err } = yield call(service.create, payload);
      if(err || !response){
        yield put({type:'createFailed',payload:err.message});
      }else if(response.ok) {
        yield put({
          type: 'createSuccess',
          payload: response.data,
        });
        yield put({ type: 'hideModal' });
        // yield put(routerRedux.push('/login'));
      }else{
        yield put({type:'createFailed', payload:response.err});
      }
    },

    *update({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { response, err } = yield call(service.update, payload);
      if(err || !response){
        yield put({type:'updateFailed',payload:err.message});
      }else if(response.ok) {
        yield put({
          type: 'updateSuccess',
          payload: response.data,
        });
        yield put({ type: 'hideModal' });
        // yield put(routerRedux.push('/login'));
      }else{
        yield put({type:'updateFailed', payload:response.err});
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

    querySuccess(state, { payload }) {
      // console.log(`reducer - querySuccess: ${payload}`);
      return { ...state, list: payload, loading: false};
    },
    queryFailed(state, { payload }){
      return { ...state, error: payload, loading: false};
    },

    createSuccess(state, action) {
      const newList = state.list;
      newList.push(action.payload);
      return { ...state, list:newList, loading: false };
    },
    createFailed(state, { payload }){
      return { ...state, error: payload, loading: false};
    },

    deleteSuccess(state,  { payload }) {
      console.log("reducer - deleteSuccess");

      return { ...state, list: payload, loading: false };
    },
    deleteFailed(state, { payload }){
      return { ...state, error: payload, loading: false};
    },

    updateSuccess(state, { payload }) {
      const newList = state.list.map(customer => {
        if (customer.id === payload.id) {
          return { ...customer, ...payload };
        }
        return customer;
      });
      return { ...state, list: newList, loading: false };
    },
    updateFailed(state, {payload}){
      return { ...state, id: null, name: null, role: null, error: payload };
    },
  },

}
