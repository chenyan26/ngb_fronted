'use strict';

var qs = require('qs');

//var cfg = require('../app.config.js');
//console.log(`Mocking HTTP service on port 8989 with base dir: ${cfg.server}`);

let customer = [];
for (let i = 1; i < 71; i++) {
	customer.push({
		id: i,
		name: '用户名'+i,
		identify_number: '4343534532'+i%5,
		gender: `${i%3 ? '男' : '女'}`,
		age: 23,
		address: '安徽省黄山市光明顶125号',
		mobile: '13812345678',
		input_date: '2016-05-04',
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
			identify_number: item.identify_number,
			gender: item.gender,
			age: item.age,
			address: item.address,
			mobile: item.mobile,
			input_date: item.input_date,
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
				obj.identify_number = item.identify_number;
				obj.gender = item.gender;
				obj.age = item.age;
				obj.address = item.address;
				obj.mobile = item.mobile;
				obj.input_date = item.input_date;

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
