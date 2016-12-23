/**
 * Created by echo on 2016/12/21.
 */
'use strict';

var qs = require('qs');

let stb = [];
for (let i = 1; i < 61; i++) {
    stb.push({
        id: i,
        number: '80000'+i,
        time: `${i%2 ? '2016-11-14 20:10' : '2016-11-14 23:25'}`,
        type: i%2
    });
}

let vs = [];
for (let i = 1; i < 61; i++) {
    vs.push({
        id: i,
        call_number: '12'+i,
        answer_number: '24'+i,
        call_time:"2016-11-24 23:10",
        answerl_time:"2016-11-24 23:10",
        end_time:"2016-11-24 23:13",
        way: i%2
    });
}

let vod = [];
for (let i = 1; i < 61; i++) {
    vod.push({
        id: i,
        number:"25" + i,
        name:"机械师"+i,
        time:"2016-12-03 01:50",
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
    },

    /**
     * 通信使用记录
     */
    'GET /admin/getVsRecord': function (req, res) {
        res.json({
            code: 0,
            data: vs
        });
    },

    'POST /admin/getVsRecordByNumber': function (req, res) {
        const { number } = qs.parse(req.body);
        console.log(`获取通信使用记录number:-------- ${number}`);

        if (number === "12345") { //该克拉号不存在
            res.json({
                code: 1
            });
            return;
        }
        let vs_number = [];
        for (let i = 1; i < 11; i++) {
            vs_number.push({
                id: i,
                call_number: `${i%3 ? '12'+i : number}`,
                answer_number: `${i%3 ? number : '24'+i}`,
                call_time:"2016-11-24 23:10",
                answer_time:"2016-11-24 23:10",
                end_time:"2016-11-24 23:13",
                way: i%2
            });
        }
        res.json({
            code: 0,
            data: vs_number
        });
    },

    /**
     * VoD点播记录
     */
    'GET /admin/getVodRecord': function (req, res) {
        res.json({
            code: 0,
            data: vod
        });
    },
};
