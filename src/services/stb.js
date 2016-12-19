/**
 * Created by echo on 2016/12/12.
 */
import request from '../utils/request';
import qs from 'qs';

export async function query() {
    return request(`/admin/getStb`);
}

export async function remove(params) {
    return request('/admin/deleteStb', {
        method: 'post',
        // headers: {
        // 	/*Must have this to make Nutz backend recognize.*/
        // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // },
        body: qs.stringify(params),
    });
}

export async function create(params) {
    return request('/admin/createStb', {
        method: 'post',
        body: qs.stringify(params),
    });
}
