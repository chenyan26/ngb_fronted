import request from '../utils/request';
import qs from 'qs';

// import cfg from '../../app.config';

// -----------------------------------  个人账号 ---------------------------------

// export async function query(params) {
// 	return request(`/api/users?${qs.stringify(params)}`);
// }

export async function query() {
	return request(`/account/individuals`);
}

/*
export async function create(params) {
	return request('/api/users', {
		method: 'post',
		body: qs.stringify(params),
	});
}

export async function remove(params) {
	return request('/api/users', {
		method: 'delete',
		body: qs.stringify(params),
	});
}

export async function update(params) {
	return request('/api/users', {
		method: 'put',
		body: qs.stringify(params),
	});
}
*/
// -----------------------------------  服务账号 ---------------------------------

