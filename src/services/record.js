/**
 * Created by echo on 2016/12/21.
 */
import request from '../utils/request';
import qs from 'qs';

/**
 * 机顶盒使用记录
 */

export async function getStbRecord() {
    return request(`/admin/getStbRecord`);
}

export async function getStbRecordByNumber(params) {
    return request('admin/getStbRecordByNumber', {
        method: 'post',
        // headers: {
        // 	/*Must have this to make Nutz backend recognize.*/
        // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // },
        body: qs.stringify(params),
    });
}

/**
 * 通信使用记录
 */
export async function getVsRecord() {
    return request(`/admin/getVsRecord`);
}

export async function getVsRecordByNumber(params) {
    return request('admin/getVsRecordByNumber', {
        method: 'post',
        // headers: {
        // 	/*Must have this to make Nutz backend recognize.*/
        // 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // },
        body: qs.stringify(params),
    });
}

/**
 * VoD点播记录
 */
export async function getVodRecord() {
    return request(`/admin/getVodRecord`);
}