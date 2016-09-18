var XLSX  = require('xlsx');

var util = require('util');

var p = function(folder, fileName){
	return util.format('%s/%s', folder, fileName); 
};

var excelFolder = 'test/excel-file';

var workbook = XLSX.readFile(p(excelFolder, 'Đơn hàng VFFM.xlsx'));

/* This example iterates through every nonempty of every sheet and dumps values: */

// var sheet_name_list = workbook.SheetNames;
// sheet_name_list.forEach(function(y) { /* iterate through sheets */
//   var worksheet = workbook.Sheets[y];
//   for (z in worksheet) {
//      all keys that do not begin with "!" correspond to cell addresses 
//     if(z[0] === '!') continue;
//     console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
//   }
// });

var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'J4';

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

/* Find desired cell */
var desired_cell = worksheet[address_of_cell];

/* Get the value */
var desired_value = desired_cell.v;

console.log(desired_value);

var range = {s:{c:5, r:4}, e:{c:5, r:72}};

console.log(XLSX.utils.encode_range(range));

range = XLSX.utils.decode_range('J4:J72');

console.log(range);

var productName = [];

for(var R = range.s.r; R <= range.e.r; ++R) {
	for(var C = range.s.c; C <= range.e.c; ++C) {
	var cell_address = {c:C, r:R};
	 // Find desired cell
	var address_of_cell = XLSX.utils.encode_cell(cell_address);
	var desired_cell = worksheet[address_of_cell];
	console.log(desired_cell.v);
	productName.push(desired_cell.v);
	}
}

range = XLSX.utils.decode_range('V4:V72');

var productQuanity = [];

for(var R = range.s.r; R <= range.e.r; ++R) {
	for(var C = range.s.c; C <= range.e.c; ++C) {
	var cell_address = {c:C, r:R};
	 // Find desired cell
	var address_of_cell = XLSX.utils.encode_cell(cell_address);
	var desired_cell = worksheet[address_of_cell];
	console.log(address_of_cell);
	// console.log(desired_cell.v);
	var quanity = desired_cell ? desired_cell.v : 0; //quite WEIRD that cell is not UNDEFINED, they should just doesn't have value
	console.log(quanity);
	productQuanity.push(quanity);
	}
}


var natural = require('natural');

console.log(natural.JaroWinklerDistance('Bắp cải Mini giống Nhật', 'cải mini Nhật'));
console.log(natural.JaroWinklerDistance('Cà chua panama 250g', 'Cà chua panama'));
console.log(natural.JaroWinklerDistance('Cà chua panama 500g', 'Cà chua panama'));

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
	return pos;
};


var matchedOnListProduct = function(term){
	return mostMatch(term, config.products);
}

console.log(matchedOnListProduct('Hành lá'));

/* call out repl to work with user */
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log('Thank you for your valuable feedback:', answer);

//   rl.close();
// });

// /* wrap function */
// /* read info from range A4: A72 */
// var getRangeVal = function(rangeString){
// 	range = XLSX.utils.decode_range(rangeString);

// 	var list = [];

// 	for(var R = range.s.r; R <= range.e.r; ++R) {
// 		for(var C = range.s.c; C <= range.e.c; ++C) {
// 			var cell_address = {c:C, r:R};
// 			 // Find desired cell
// 			var address_of_cell = XLSX.utils.encode_cell(cell_address);
// 			var desired_cell = worksheet[address_of_cell];
// 			var val = desired_cell ? desired_cell.v : 0;
			
// 			list.push(val);
// 		}
// 	}
// 	return list;
// }

// console.log(getRangeVal('J4:J72'));

// var fs = require('fs');

// var fs = require('fs');

// fs.readdir(excelFolder, function(err, items) {
// 	items.forEach(function(item){
// 		var p = /^~\$/g;
// 		console.log(p.test(item));
// 	});
// });

// var listFile

// var workbook = XLSX.readFile(p(excelFolder, 'Đơn hàng VFFM.xlsx'));

// var first_sheet_name = workbook.SheetNames[0];

// var worksheet = workbook.Sheets[first_sheet_name];

var list_DonHang = function(excelFolder){
	var fs = require('fs');

	var list_DonHang = [];

	var items = fs.readdirSync(excelFolder);
	console.log(items);
	items.forEach(function(item){
		var p = /^~\$|^\.|^\../;
		console.log(p.test(item));
		p.test(item) != true ? function(){
			list_DonHang.push(item);
		}() : false;
	});
	return list_DonHang;
};

console.log(list_DonHang(excelFolder));

/* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
// var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };

// var wbout = XLSX.write(workbook,wopts);

// function s2ab(s) {
//   var buf = new ArrayBuffer(s.length);
//   var view = new Uint8Array(buf);
//   for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//   return buf;
// }

// /* the saveAs call downloads a file on the local machine */
// saveAs(new Blob([s2ab(wbout)],{type:""}), "test.xlsx")

