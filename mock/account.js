'use strict';

var qs = require('qs');

//var cfg = require('../app.config.js');
//console.log(`Mocking HTTP service on port 8989 with base dir: ${cfg.server}`);

const individual = [];
for (let i = 0; i < 100; i++) {
	individual.push({
		id: `${i}`,
		number: `11111111${i}`,
		mobile: `11111111${i}`,
		name: `用户名 ${i}`,
	});
}

module.exports = {

	// 'POST /login': function (req, res) {
	// 	setTimeout(function () {
	// 		var request = qs.parse(req.body);
    //
	// 		console.log(`login: account=${request.account} password=${request.password}`);
    //
	// 		if(request.account=='ghost'){
	// 			res.json({
	// 				ok: false,
	// 				err: '服务器错误',
	// 				data: null
	// 			});
	// 		}else{
	// 			res.json({
	// 				ok: true,
	// 				err: null,
	// 				data: {id:1, name:'foo',role:'管理员'}
	// 			});
	// 		}
	// 	}, 300);
	// },
    //
	// 'POST /logout': function (req, res) {
	// 	res.json({
	// 		ok: true,
	// 		err: null,
	// 		data: null
	// 	});
	// },


	'GET /account/individuals': function (req, res) {
		res.json({
			ok: true,
			err: null,
			data: individual
				// 	[{id:1, number:8888888881, mobile:'18937583021', name:'用户01'},
				// {id:2, number:8888888882, mobile:'18937583022', name:'用户02'},
				// {id:3, number:8888888883, mobile:'18937583023', name:'用户03'},
				// {id:4, number:8888888884, mobile:'18937583024', name:'用户04'}
				// ]
			// data:88888
		});
	},

};
