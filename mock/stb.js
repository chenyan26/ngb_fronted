/**
 * Created by echo on 2016/12/12.
 */
'use strict';

var qs = require('qs');

let stb = [];
for (let i = 1; i < 71; i++) {
    stb.push({
        id: i,
        serial_number: '12343554'+i,
        ca_number: 'ca3254655'+i,
        system_version: 'v1.2',
        register_date:'2016-10-14'
    });
}

module.exports = {
    'GET /admin/getStb': function (req, res) {
        res.json({
            code: 0,
            data: stb
        });
    },

    'POST /admin/createStb': function (req, res) {
        const item = qs.parse(req.body);
        const lastId = Number(stb[stb.length - 1].id)+ 1;
        res.json({
            code: 0,
            data: {id:lastId,
                   serial_number:item.serial_number}
        });
    },

    'POST /admin/deleteStb': function (req, res) {
        const { ids } = qs.parse(req.body);
        console.log(`删除机顶盒:-------- ${ids}`);

        // for (let i = 0; i < ids.length; i ++) {
        //     stb = stb.filter(s => s.id != ids[i]);
        // }

        res.json({
            code: 0
            // data: stb[stb.length - 1]
        });
    }
};
