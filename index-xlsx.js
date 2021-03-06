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