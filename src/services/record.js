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

export async function getStbReocrdByNumber(params) {
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

/**
 * VoD点播记录
 */