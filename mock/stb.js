/**
 * Created by echo on 2016/12/12.
 */
'use strict';

var qs = require('qs');

let stb = [];
for (let i = 1; i < 71; i++) {
    stb.push({
        id: i,
        name: '用户名'+i,
        gender: `${i%3 ? '男' : '女'}`,
        age: 23,
        addr: '湖南省长沙市天心区南湖路125号',
        mobile: '13812345678',
        tel: '073189776543',
        buy_date: '2015-05-04',
        activate_date: '2015-08-03',
        status: i%2
    });
}

module.exports = {
    'GET /stb': function (req, res) {
        res.json({
            ok: true,
            err: null,
            data: stb
        });
    },

    'DELETE /stb': function (req, res) {
        const { ids } = qs.parse(req.body);
        console.log(`删除数量:-------- ${ids}`);

        for (let i = 0; i < ids.length; i ++) {
            stb = stb.filter(s => s.id != ids[i]);
        }


        res.json({
            ok: true,
            err: null,
            data: stb
        });
    },

    'POST /stb': function (req, res) {
        const item = qs.parse(req.body);
        const lastId = stb[stb.length - 1].id;
        stb.push({
            id: `${ Number(lastId)+ 1}`,
            name: item.name,
            gender: item.gender,
            age: item.age,
            addr: item.addr,
            mobile: item.mobile,
            tel: item.tel,
            buy_date: item.buy_date,
            activate_date: item.activate_date,
            status: 0
        });
        res.json({
            ok: true,
            err: null,
            data: stb[stb.length - 1]
        });
    },

    'PUT /stb': function (req, res) {
        const item = qs.parse(req.body);
        let index = 0;
        stb.map((obj, i)=> {
            if (obj.id == item.id) {
                obj.name = item.name;
                obj.gender = item.gender;
                obj.age = item.age;
                obj.addr = item.addr;
                obj.mobile = item.mobile;
                obj.tel = item.tel;
                obj.buy_date = item.buy_date;
                obj.activate_date = item.activate_date;

                index = i;
            }
        });
        res.json({
            ok: true,
            err: null,
            data: stb[index]
        });
    },

};
