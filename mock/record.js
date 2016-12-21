/**
 * Created by echo on 2016/12/21.
 */
'use strict';

var qs = require('qs');

let stb = [];
for (let i = 1; i < 41; i++) {
    stb.push({
        id: i,
        number: '80000'+i,
        time: `${i%2 ? '2016-11-14 20:10' : '2016-11-14 23:25'}`,
        type: i%2
    });
}

module.exports = {
    /**
     * 机顶盒使用记录
     */
    'GET /admin/getStbRecord': function (req, res) {
        res.json({
            code: 0,
            data: stb
        });
    },

    'POST /admin/getStbRecordByNumber': function (req, res) {
        const { number } = qs.parse(req.body);
        console.log(`获取机顶盒使用记录number:-------- ${number}`);

        if (number === "12345") { //该克拉号不存在
            res.json({
                code: 1
            });
            return;
        }

        if (number === "12") { //该克拉号不存在
            res.json({
                code: 0,
                data:[]
            });
            return;
        }

        let stb_number = [];
        for (let i = 1; i < 11; i++) {
            stb_number.push({
                id: i,
                number: number,
                time: `${i%2 ? '2016-11-14 20:10' : '2016-11-14 23:25'}`,
                type: i%2
            });
        }
        res.json({
            code: 0,
            data: stb_number
        });
    }

    /**
     * 通信使用记录
     */

    /**
     * VoD点播记录
     */
};
