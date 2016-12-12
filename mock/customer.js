'use strict';

var qs = require('qs');

//var cfg = require('../app.config.js');
//console.log(`Mocking HTTP service on port 8989 with base dir: ${cfg.server}`);

let customer = [];
for (let i = 1; i < 71; i++) {
	customer.push({
		id: i,
		name: '用户名'+i,
		gender: `${i%3 ? '男' : '女'}`,
		age: 23,
		addr: '安徽省黄山市光明顶125号',
		mobile: '13812345678',
		tel: '073189776543',
		stb_status: i%3,
		mobile_status: i%3
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


	'GET /customer': function (req, res) {
		res.json({
			ok: true,
			err: null,
			data: customer
			// 	[{id:1, number:8888888881, mobile:'18937583021', name:'用户01'},
			// {id:2, number:8888888882, mobile:'18937583022', name:'用户02'},
			// {id:3, number:8888888883, mobile:'18937583023', name:'用户03'},
			// {id:4, number:8888888884, mobile:'18937583024', name:'用户04'}
			// ]
			// data:88888
		});
	},

	'DELETE /customer': function (req, res) {
		const { ids } = qs.parse(req.body);
		console.log(`删除数量:-------- ${ids}`);

		// customer = customer.filter(user => user.id !== deleteItem.id);

		for (let i = 0; i < ids.length; i ++) {
			customer = customer.filter(cus => cus.id != ids[i]);
		}


		res.json({
			ok: true,
			err: null,
			data: customer
		});
	},

	'POST /customer': function (req, res) {
		const item = qs.parse(req.body);
		const lastId = customer[customer.length - 1].id;
		customer.push({
			id: `${ Number(lastId)+ 1}`,
			name: item.name,
			gender: item.gender,
			age: item.age,
			addr: item.addr,
			mobile: item.mobile,
			tel: item.tel,
			stb_status: 0,
			mobile_status: 0
		});
		// customer = customer.filter(user => user.id !== deleteItem.id);
		res.json({
			ok: true,
			err: null,
			data: customer[customer.length - 1]
		});
	},

	'PUT /customer': function (req, res) {
		const item = qs.parse(req.body);
		let index = 0;
		customer.map((obj, i)=> {
			if (obj.id == item.id) {
				obj.name = item.name;
				obj.gender = item.gender;
				obj.age = item.age;
				obj.addr = item.addr;
				obj.mobile = item.mobile;
				obj.tel = item.tel;
				obj.stb_status = 0;
				obj.mobile_status = 0;

				index = i;
			}
		});
		res.json({
			ok: true,
			err: null,
			data: customer[index]
		});
	},

};
