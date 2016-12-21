'use strict';

var qs = require('qs');

//var cfg = require('../app.config.js');
//console.log(`Mocking HTTP service on port 8989 with base dir: ${cfg.server}`);

let customer = [];
for (let i = 1; i < 71; i++) {
	customer.push({
		id: i,
		name: '用户名' + i,
		gender: i%2,
		age: 23,
		address: '安徽省黄山市光明顶125号',
		mobile: '13812345678',
		serial_number: ['5923a8f17b43aa9b' + i, 'c9e95efb47c680dc' + i,'ba6b03c88b091fd6' + i],
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
		});
	},

	'POST /admin/updateCustomer': function (req, res) {
		const item = qs.parse(req.body);
		console.log(`修改客户:-------- ${item.id}`);
		res.json({
			code: 0,
			// data: customer[index]
		});
	},

};
