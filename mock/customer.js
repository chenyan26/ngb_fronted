'use strict';

var qs = require('qs');

//var cfg = require('../app.config.js');
//console.log(`Mocking HTTP service on port 8989 with base dir: ${cfg.server}`);

let customer = [];
for (let i = 1; i < 71; i++) {
	customer.push({
		id: i,
		name: '用户名' + i,
		gender: `${i%3 ? '男' : '女'}`,
		age: 23,
		address: '安徽省黄山市光明顶125号',
		mobile: '13812345678',
		serial_number: '7593vsfewter' + i,
	});
}

module.exports = {
	'GET /admin/getCustomer': function (req, res) {
		res.json({
			code: 0,
			data: customer
		});
	},

	'POST /admin/createCustomer': function (req, res) {
		const item = qs.parse(req.body);
		const lastId = Number(customer[customer.length - 1].id) + 1;
		res.json({
			code: 0,
			data: {id:lastId,
				name: item.name,
				gender: item.gender,
				age: item.age,
				address: item.address,
				mobile: item.mobile,
				serial_number:item.serial_number}
		});
	},

	'POST /admin/deleteCustomer': function (req, res) {
		const { ids } = qs.parse(req.body);
		console.log(`删除客户:-------- ${ids}`);

		// customer = customer.filter(user => user.id !== deleteItem.id);

		// for (let i = 0; i < ids.length; i ++) {
		// 	customer = customer.filter(cus => cus.id != ids[i]);
		// }

		res.json({
			code: 0
			// data: customer
		});
	},

	'POST /admin/updateCustomer': function (req, res) {
		const item = qs.parse(req.body);
		console.log(`修改客户:-------- ${item.id}`);
		/*
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
		*/
		res.json({
			code: 0,
			// data: customer[index]
		});
	},

};
