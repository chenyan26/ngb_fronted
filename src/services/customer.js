import request from '../utils/request';
import qs from 'qs';

// import cfg from '../../app.config';

// export async function query(params) {
// 	return request(`/api/users?${qs.stringify(params)}`);
// }

import { url, strFromArr } from './util';

export async function query() {
	return request(url + "getCustomer");
}

export async function create(params) {
	return request(url + "createCustomer", {
		headers: {
			/*Must have this to make Nutz backend recognize.*/
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		method: 'post',
		body: qs.stringify(params),
	});
}

export async function remove(params) {
	return request(url + 'deleteCustomer', {
		headers: {
			/*Must have this to make Nutz backend recognize.*/
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		method: 'post',
		body: strFromArr(params),
	});
}

export async function update(params) {
	return request(url + 'updateCustomer', {
		headers: {
			/*Must have this to make Nutz backend recognize.*/
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		method: 'post',
		body: qs.stringify(params),
	});
}
