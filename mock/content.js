/**
 * Created by echo on 2016/12/20.
 */
'use strict';

var qs = require('qs');

//var cfg = require('../app.config.js');
//console.log(`Mocking HTTP service on port 8989 with base dir: ${cfg.server}`);

let content = [];
for (let i = 1; i < 71; i++) {
    content.push({
        id: i,
        poster:"http://image14.m1905.cn/uploadfile/2009/1127/20091127043733124.jpg",
        name:"嗜血破晓" + i,
        year:"2010",
        director:"迈克尔·斯派瑞",
        actors:"伊桑·霍克，威廉·达福，伊莎贝尔·卢卡斯",
        region:"美国",
        synopsis:"爱德华·道尔顿在一次意外结识了人类奥德丽·班尼特，通过她认识了在一次意外中由吸血鬼奇迹般变成人类的艾维斯，在三人的共同努力下，找到了由吸血鬼变成人类的方法。",
        tags:["动作冒险","欧美片场"],
        url:"http://119.44.217.18/sxpx.mp4"
    });
}

module.exports = {
    'GET /admin/getContent': function (req, res) {
        res.json({
            code: 0,
            data: content
        });
    },

    'POST /admin/createContent': function (req, res) {
        const item = qs.parse(req.body);
        const lastId = Number(content[content.length - 1].id) + 1;
        res.json({
            code: 0,
            data: {id:lastId,
                poster: item.poster,
                name: item.name,
                year: item.year,
                director: item.director,
                actors: item.actors,
                region:item.region,
                synopsis: item.synopsis,
                tags:item.tags,
                url:item.url}
        });
    },

    'POST /admin/deleteContent': function (req, res) {
        const { ids } = qs.parse(req.body);
        console.log(`删除内容:-------- ${ids}`);
        res.json({
            code: 0
        });
    },

    'POST /admin/updateContent': function (req, res) {
        const item = qs.parse(req.body);
        console.log(`修改内容:-------- ${item.id}`);
        res.json({
            code: 0,
        });
    },

};
