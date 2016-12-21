/**
 * Created by echo on 2016/12/20.
 */
'use strict';

var qs = require('qs');

let stb = [];
for (let i = 1; i < 41; i++) {
    stb.push({
        id: i,
        number: '80000'+i,
        register_date: '2016-10-14',
        lately_date:'2016-12-14'
    });
}

let mobile = [];
for (let i = 1; i < 41; i++) {
    mobile.push({
        id: i,
        number: '1383343554'+i,
        register_date: '2016-9-14',
        lately_date:'2016-12-18'
    });
}

module.exports = {
    'POST /admin/getAccount': function (req, res) {
        const { type } = qs.parse(req.body);
        console.log(type);

        let user = {};
        if (type == 0) { //机顶盒
            user = stb;
        } else {
            user = mobile;
        }
        res.json({
            code: 0,
            data: user
        });
    },

    'POST /admin/deleteAccount': function (req, res) {
        const { ids } = qs.parse(req.body);
        console.log(`删除用户:-------- ${ids}`);

        res.json({
            code: 0
        });
    }
};
