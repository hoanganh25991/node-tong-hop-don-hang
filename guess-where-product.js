/* try on one workbook */
var XLSX = require('xlsx');

var util = require('util');

var natural = require('natural');

var config = require('./lib/config');

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

var excelFolder = 'test/excel-file';

var donHangs = getDonHang(excelFolder);

var donHang1 = donHangs[0];

// rangeProduct = XLSX.utils.decode_range(rangeString);

// var cell_address = {c:rangeProduct.s.c, r:R};
// var address_of_cell = XLSX.utils.encode_cell(cell_address);
// var desired_cell = worksheet[address_of_cell];
// var val = desired_cell ? desired_cell.v : 0;

var workbook = XLSX.readFile(util.format('%s/%s', excelFolder, donHang1));
var worksheet = workbook.Sheets[workbook.SheetNames[0]];

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

	return pos;
};

var posInListProduct = function(term){
	return mostMatch(term, config.products);
};

var signal = function(cellAdd, worksheet){
	var address_of_cell = XLSX.utils.encode_cell(cellAdd);
	var desired_cell = worksheet[address_of_cell];
	var val = desired_cell ? desired_cell.v : '';

	var pos = posInListProduct(val);

	var signal = pos > 0 ? true : false;

	return signal;
};

var createMap = function(worksheet){
	const MAX_ROW = 20;
	const MAX_COL = 20;

	var col = 0;
	var row = 0;

	var moveOn = true;

	var map = [];

	// fill map
	for(var i = 0; i < MAX_COL; i++){
		map.push([]);
		for(var j = 0; j < MAX_ROW; j++){
			map[i].push(0);
		}
	}

	console.log(map);

	var cell_address = {c: col, r: row};

	while(moveOn){
		//decide what to do when get signal
		signal(cell_address, worksheet) ? function(){
			map[col][row] = 1;
		}() : false;
		row++;
		row < MAX_ROW ? false : function(){
			row = 0; //reset row
			col++; //increase col
		}();
		moveOn = col < MAX_COL && row < MAX_ROW ? true : false;
		cell_address = {c: col, r: row};
		process.stdout.write('.');
	}
	console.log();
	console.log('\033[01;32mmap\033[0m');

	return map;
};

var map = createMap(worksheet);
console.log(map);







