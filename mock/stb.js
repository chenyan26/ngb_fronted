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
            serial_number: item.serial_number,
            ca_number: item.ca_number,
            system_version: item.system_version,
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
                obj.serial_number = item.serial_number;
                obj.ca_number = item.ca_number;
                obj.system_version = item.system_version;

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
