/**
 * Created by echo on 2016/12/20.
 */
import request from '../utils/request';
import qs from 'qs';

// import cfg from '../../app.config';

// export async function query(params) {
// 	return request(`/api/users?${qs.stringify(params)}`);
// }

export async function query(params) {
    return request('admin/getAccount', {
        method: 'post',
        // headers: {
        // 	/*Must have this to make Nutz backend recognize.*/
        // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // },
        body: qs.stringify(params),
    });
}

export async function remove(params) {
    return request('admin/deleteAccount', {
        method: 'post',
        // headers: {
        // 	/*Must have this to make Nutz backend recognize.*/
        // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // },
        body: qs.stringify(params),
    });
}
