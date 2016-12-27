/**
 * Created by echo on 2016/12/27.
 */

import qs from 'qs';

export const url = "http://119.44.217.18:8080/voip-backend/admin/";

export function strFromArr(params) {
    return qs.stringify(params, { arrayFormat: 'repeat' });
}