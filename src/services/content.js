/**
 * Created by echo on 2016/12/20.
 */
import request from '../utils/request';
import qs from 'qs';

import { url, strFromArr } from './util';

export async function query() {
    return request(url + 'getContent');
}

export async function create(params) {
    return request('admin/createContent', {
        method: 'post',
        headers: {
            /*Must have this to make Nutz backend recognize.*/
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: qs.stringify(params),
    });
}

export async function remove(params) {
    return request(url + 'deleteContent', {
        method: 'post',
        headers: {
        	/*Must have this to make Nutz backend recognize.*/
        	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: strFromArr(params)
    });
}

export async function update(params) {
    return request(url + 'updateContent', {
        method: 'post',
        headers: {
            /*Must have this to make Nutz backend recognize.*/
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: qs.stringify(params),
    });
}
