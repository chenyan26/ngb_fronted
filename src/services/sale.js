/**
 * Created by echo on 2017/1/6.
 */
import request from '../utils/request';
import qs from 'qs';

import { url, strFromArr } from './util';

export async function query() {
    return request(url + 'getSale');
}

export async function remove(params) {
    return request(url + 'deleteSale', {
        method: 'post',
        headers: {
            /*Must have this to make Nutz backend recognize.*/
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: strFromArr(params),
    });
}

export async function create(params) {
    // const s = strFromArr(params.serial_number);
    // params.serial_number = undefined;
    return request(url + 'createSale', {
        method: 'post',
        headers: {
            /*Must have this to make Nutz backend recognize.*/
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: strFromArr(params),
    });
}

export async function update(params) {
    return request(url + 'updateSale', {
        headers: {
            /*Must have this to make Nutz backend recognize.*/
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'post',
        body: strFromArr(params),
    });
}
