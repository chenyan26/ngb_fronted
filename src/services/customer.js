import request from '../utils/request';
import qs from 'qs';

// import cfg from '../../app.config';

// export async function query(params) {
// 	return request(`/api/users?${qs.stringify(params)}`);
// }

export async function query() {
	return request(`/customers`);
}

export async function remove(params) {
	return request('/customers', {
		method: 'delete',
		// headers: {
		// 	/*Must have this to make Nutz backend recognize.*/
		// 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		// },
		body: qs.stringify(params),
	});
}

export async function create(params) {
	return request('/customers', {
		method: 'post',
		body: qs.stringify(params),
	});
}

export async function update(params) {
	return request('/customers', {
		method: 'put',
		body: qs.stringify(params),
	});
}
