var XLSX = require('xlsx');

var util = require('util');

var natural = require('natural');

var getDonHang = function(excelFolder){
	var fs = require('fs');

	var donHangs = [];

	var items = fs.readdirSync(excelFolder);
	
	items.forEach(function(item){
		var p = /^~\$|^\.|^\../;
		p.test(item) != true ? function(){
			donHangs.push(item);
		}() : false;
	});
	return donHangs;
};

/**
 * tongHop
 * @type {Array}
 */
var tongHop = [];

tongHop.push(['Tên sản phẩm', new Date().toString()]);

var excelFolder = 'test/excel-file';

var donHangs = getDonHang(excelFolder);


/**
 * range for product-name
 */
var rl = require('readline-sync');
var where = [];

donHangs.forEach(function(donHang){
	var tmp = {file: donHang};
	tmp.rangeProduct = rl.question(util.format('in \033[01;32m%s\033[0m, where product name :', donHang));
	tmp.rangeValue = rl.question(util.format('in \033[01;32m%s\033[0m, where product quanity :', donHang));
	where.push(tmp);
});

/**
 * submit a range > get out an array of val
 * @param  {[type]} rangeString [description]
 * @param  {[type]} worksheet   [description]
 * @return {[type]}             [description]
 */
var getValOfRange = function(rangeString, rangeString2, worksheet){
	rangeProduct = XLSX.utils.decode_range(rangeString);
	rangeVal = XLSX.utils.decode_range(rangeString2);

	var list = [];

	for(var R = rangeProduct.s.r; R <= rangeProduct.e.r; ++R){
		var tmp = {};
		var cell_address = {c:rangeProduct.s.c, r:R};
		var address_of_cell = XLSX.utils.encode_cell(cell_address);
		var desired_cell = worksheet[address_of_cell];
		var val = desired_cell ? desired_cell.v : 0;
		tmp.name = val;

		var cell_address = {c:rangeVal.s.c, r:R};
		var address_of_cell = XLSX.utils.encode_cell(cell_address);
		var desired_cell = worksheet[address_of_cell];
		var val = desired_cell ? desired_cell.v : 0;
		tmp.val = val;
		list.push(tmp);
	}

	return list;
}

/**
 * decide where productName in tong-hop file
 */

var config = require('./lib/config');

var mostMatch = function(term, list){
	var loopLength = list.length;
	var is = 0;
	var mostMatch = 0.8; //matched at least 0.8
	var pos = -1;
	while(mostMatch <= 1 && is < loopLength){
		var matchPercent = natural.JaroWinklerDistance(list[is], term);
		matchPercent > mostMatch ? function(){
			mostMatch = matchPercent;
			pos = is;
		}() : false;
		is++;
	}

	// if(mostMatch < 0.8){
	// 	pos = -1; //selft determine that, now thing most matched here;
	// }
	// console.log(pos);
	return pos;
};


var posInListProduct = function(term){
	return mostMatch(term, config.products);
}

var data = [];

config.products.forEach(function(p){
	var tmp = [];
	tmp.push(p);
	data.push(tmp);
});

var headerCompany = [null];

// console.log(data);

where.forEach(function(row, donHangX){
	var file = row.file;
	var rangeProduct = row.rangeProduct;
	var rangeValue = row.rangeValue;

	var workbook = XLSX.readFile(util.format('%s/%s', excelFolder, file));

	headerCompany.push('product');
	headerCompany.push(file.replace('Đơn hàng ', '').replace('.xlsx', ''));

	var worksheet = workbook.Sheets[workbook.SheetNames[0]];

	var listData = getValOfRange(rangeProduct, rangeValue, worksheet);

	// console.log(listData);
	
	var posList = [];
	
	listData.forEach(function(tmp){
		var trained = config.trainList.filter((val)=>{
			return (val.similar == tmp.name);
		});

		trained.length > 1 ? (()=>{
			console.log('\033[01;31m[E]\033[0m You have train \033[01;32m%s\033[0m more than 1 time, please fix it', tmp.name);
		})() : null;

		var pos = trained.length > 0 ? trained[0].pos : posInListProduct(tmp.name);
		posList.includes(pos) ? function(){
			console.log('\033[01;31m[E]\033[0m Don\'t know where to import: %s', tmp.name);
		}() : function(){
			posList.push(pos);
		}();
		// console.log(tmp.name, pos);
		pos != -1 ? function(){
			data[pos].push(tmp.name);
			data[pos].push(tmp.val); //2 san pham cung mot ma > push ko theo cot
		}() :
		function(){
			console.log(util.format('\033[01;31m[E]\033[0m File: %s, Product: %s, Val: %s', file, tmp.name, tmp.val));
		}()
	});

	//fill in data, which is empty by null
	data.forEach(function(row){
		//the first index is product-name
		var pos = donHangX * 2;
		row[(pos + 1)] == undefined ? function(){
			row[(pos + 1)] = null;
			row[(pos + 2)] = null;
		}(): false;
	});
});

tongHop.push(headerCompany);

data.forEach(function(rd){
	tongHop.push(rd);
});

// console.log(tongHop);
function sheet_from_array_of_arrays(data, opts) {
	var ws = {};
	var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
	for(var R = 0; R != data.length; ++R) {
		for(var C = 0; C != data[R].length; ++C) {
			if(range.s.r > R) range.s.r = R;
			if(range.s.c > C) range.s.c = C;
			if(range.e.r < R) range.e.r = R;
			if(range.e.c < C) range.e.c = C;
			var cell = {v: data[R][C] };
			if(cell.v == null) continue;
			var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
			
			if(typeof cell.v === 'number') cell.t = 'n';
			else if(typeof cell.v === 'boolean') cell.t = 'b';
			else if(cell.v instanceof Date) {
				cell.t = 'n'; cell.z = XLSX.SSF._table[14];
				cell.v = datenum(cell.v);
			}
			else cell.t = 's';
			
			ws[cell_ref] = cell;
		}
	}
	if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
	return ws;
}
function Workbook() {
	if(!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
}
var wb = new Workbook(), ws = sheet_from_array_of_arrays(tongHop);
/* add worksheet to workbook */
var ws_name = 'don-hang';
wb.SheetNames.push(ws_name);
wb.Sheets[ws_name] = ws;

/* write file */
var x = 'tong-hop.xlsx';
XLSX.writeFile(wb, x);
console.log(util.format('write file success: \033[01;32m%s\033[0m', x));