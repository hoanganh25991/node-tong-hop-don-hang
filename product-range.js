/*
give me a worksheet ~ just an object of 
{
	A1: "abc",
	A2: "def",
	...move on...
}

then i try on each column
(0,0), (0,1), (0,2), (0,3),...
>A1, A2, A3,...
>when i find out the signal
>track it
>then get it back
>done

*/
/*
dependencies
*/
var natural = require('natural');
natural._check = function(term, origin){
	// console.log(term, origin);
	return natural.JaroWinklerDistance(origin, term);
};

var EXCEL = require('xlsx');
	
var guessProductRange = function(worksheet, listProduct){
	// console.log(worksheet);
	// console.log(worksheet['E13']);
	/*
	go to the first one A1, loop down, A2, A3,...
	util get max, stop

	base on natural, check the signal, in lcurrenttProduct?
	*/
	
	

	var worksheetRange = EXCEL.utils.decode_range(worksheet['!ref']);
	/* 
	result:
	{
		s: {c: 0, r: 0},
		e: {c: 0, r: 9}
	}
	*/
	
	/*start from the first 0,0 > move on
	when get back the value, stop
	*/

	var productRange = 
	{
		s: {c: 0, r: 0},
		r: {c: 0, r: 0}
	};

	var found = false;

	var inRange = function(cell, worksheetRange){
		/*
		cell
		{
			c: 0,
			r: 0
		}
		*/
		return (
			cell.c >= worksheetRange.s.c &&
			cell.r >= worksheetRange.s.r &&
			cell.c <= worksheetRange.e.c &&
		 	cell.r <= worksheetRange.e.r &&
		 	true
		);

	};

	var cell = 
	{
		c: 0,
		r: 0
	};

	var mostMatch = function(term, list){
		var loopLength = list.length;
		var current = 0;
		const AT_LEAST = 0.6; //matched at least 0.8
		var pos = -1;
		var mostMatchList = [];
		var mostMatch = AT_LEAST;

		while(mostMatch <= 1 && current < loopLength){
			var matchPercent = natural._check(term, list[current]);
			// console.log(matchPercent);
			matchPercent > mostMatch ? function(){
				mostMatch = matchPercent;
				pos = current;
				var r = {};
				r.term = term;
				r.origin = list[current];
				r.pos = current;
				r.percent = mostMatch;
				mostMatchList.push(r);
			}() : false;
			current++;
		}
		
		return mostMatchList;
	};

	worksheetRange =
	{
		s: {c:1, r:0},
		e: {c:1, r:34}
	};
	cell = {c: 1, r:0};
	console.log(cell);
	console.log(inRange(cell, worksheetRange));
	// console.log(worksheet);

	while(!found && inRange(cell, worksheetRange)){
		// console.log(EXCEL.utils.encode_cell(cell));
		var celVal = '';
		if(worksheet[EXCEL.utils.encode_cell(cell)]){
			celVal = worksheet[EXCEL.utils.encode_cell(cell)].v;
		}
		
		var list = mostMatch(celVal, listProduct);
		console.log(list);
		cell.r++;
	}

	// while(!found && inRange(cell, worksheetRange)){
	// 	var celVal = worksheet[EXCEL.encode_cell(cell)] | '';
	// 	var list = mostMatch(celVal, config.products);
	// 	list.l
	//
	// }


};

var workbook = EXCEL.readFile('./excel-file/Đơn hàng 3 sạch 17_09_2016.xlsx');
var	worksheet = workbook.Sheets['Sheet1'];


var config = {};

config.products = [
    'Xà Lách', 'Xà lách lolo tím', 'Xà lách lolo xanh', 'Xà lách Romaine',
    'Xà lách Oakleaf xanh', 'Xà lách IceBerg', 'Xà lách Frise',
    'Xà lách Mỡ', 'Cà Chua', 'Cà chua Đà Lạt', 'Cà chua Beef',
    'Cà chua panama 250gr', 'Cà chua panama 500gr', 'Cà chua Doufu',
    'Cà chua avatar 250 gr', 'Cà chua avatar 500 gr',
    'Cà chua Picota 250gr', 'Cà chua Picota 500gr',
    'Cà chua bi socola 250gr', 'Cà chua bi socola 500gr', 'Dưa Leo baby',
    'Khoai Lang mật', 'Chuối Laba', 'Bí Đỏ hồ lô', 'Cải Thảo', 'Dâu Tây',
    'Su Su', 'Hồng Khô', 'Chanh Dây', 'Lá trà xanh', 'Bó Xôi mini',
    'Khoai Tây', 'Khoai tây vàng', 'Khoai tây hồng', 'Cà Rốt',
    'Cà rốt mini', 'Cà rốt Đà Lạt', 'Củ Dền', 'Rau Gia Vị',
    'Súp Lơ Xanh mini', 'Bắp Cải', 'Bắp cải trắng', 'Bắp cải trái tim',
    'Bắp cải mini giống Nhật', 'Cải Thìa', 'Cải Cầu Vồng', 'Bông Atiso',
    'Su hào', 'Ớt Chuông baby', 'Cam Canh', 'Hành ', 'Hành lá', 'Hành Paro',
    'Sả', 'Chanh không hạt', 'Củ cải đỏ', 'Hành tây',
    'Nấm Ngọc Thạch Đà Lạt', 'Bí Xanh non', 'Bí Ngòi Xanh', 'Gừng',
    'Củ cải trắng'
];
guessProductRange(worksheet, config.products);