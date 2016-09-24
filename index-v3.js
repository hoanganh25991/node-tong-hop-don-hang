/*get out product-range
when loop through, get out (origin  , term)*/
var Excel = require('xlsx');
var workbook = Excel.readFile('./excel-file/Đơn hàng HQ Food..xlsx');
var worksheet = workbook.Sheets[workbook.SheetNames[0]];

var productList = require('./lib/config').products;
var natural = require('natural');

var repl = require('repl');

var askUser = require('readline-sync').question;

var ProductRange = function(worksheet, productList) {
	var _ref = Excel.utils.decode_range(worksheet['!ref']);
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

	var productRange = {
		s: {
			c: 0,
			r: 0
		},
		r: {
			c: 0,
			r: 0
		}
	};

	var found = false;

	var inRange = function(cell, _ref) {
		/*
		cell
		{
			c: 0,
			r: 0
		}
		*/
		return (
			cell.c >= _ref.s.c &&
			cell.r >= _ref.s.r &&
			cell.c <= _ref.e.c &&
			cell.r <= _ref.e.r &&
			true
		);

	};

	var cell = {
		c: 0,
		r: 0
	};

	var mostMatch = function(term, list) {
		const AT_LEAST = 0.8; //matched at least 0.8

		var r = {};
		r.term = term;
		var mostMatchList = [];

		list.filter(function(val, index){
			var matchedPercent = natural.JaroWinklerDistance(term, val);
			var matched = matchedPercent > AT_LEAST;
			matched ? function(){
				var tmp = {};
				tmp.name = val;
				tmp.pos = index;
				tmp.percent = matchedPercent;
				mostMatchList.push(tmp);
			}() : false;
			return matched;
		});

		try{
			var chose = mostMatchList.reduce(function(x, y){
				return (x.percent > y.percent) ? x : y;
			});
			r.chose = chose;
		}catch(err){
			r.chose = undefined;
		}

		

	   

		r.mostMatchList = mostMatchList;

		return r;
	};

	/* test mostMatch */
	var m = mostMatch("fucked", productList);
	console.log(m);

	_ref = {
		s: {
			c: 1,
			r: 0
		},
		e: {
			c: 1,
			r: 34
		}
	};

	cell = {
		c: 1,
		r: 0
	};
	// console.log(cell);
	// console.log(inRange(cell, _ref));
	// // console.log(worksheet);
	var Watcher = function(){
		this.started = false;
		this.successive = 0;
		this.fail = 0;
		this.signalList = [];
		const SUCCESSIVE_LEAST = 5;

		this.detect = function(mostMatchObj){
			if(mostMatchObj.chose && !this.started){
				this.started = true;
				this.signalList.push(mostMatchObj);
				this.reset();
				return;
			}

			if(mostMatchObj.chose && this.started){
				this.successive++;
				this.signalList.push(mostMatchObj);
				this.reset();
				return;
			}

			if(!mostMatchObj.chose && this.started){
				this.fail++;
				this.reset();
				return;
			}

			if(!mostMatchObj.chose && !this.started){
				this.reset();
				return;
			}
		};
		this.resetAll = function(){
			this.started = false;
			this.successive = 0;
			this.fail = 0;
			this.signalList = [];
		};
		this.reset = function(){
			if(this.started && (this.fail > 0) && this.successive < SUCCESSIVE_LEAST){
				this.resetAll();
			}
		};

		this.found = function(){
			if(this.started && (this.fail > 0) && this.successive >= SUCCESSIVE_LEAST){
				return true;
			}
			return false;
		};

		// this.store = function(mostMatchObj){
		// 	mostMatchObj.cell = 'A1';
		// };
		
		return this;
	};

	var watcher =  new Watcher;


	/* move inside guess, when call guess, run
	while (!found && inRange(cell, _ref)) {
		var cellRef = Excel.utils.encode_cell(cell);
		var celVal = worksheet[cellRef] ? worksheet[cellRef].v : '';

		var mostMatchObj = mostMatch(celVal, productList);
		mostMatchObj.cellRef = cellRef;
		
		watcher.detect(mostMatchObj);

		found = watcher.found();

		cell.r++;

		//reset cell-row && increase cell-col
		if (cell.r > _ref.e.r){
			cell.r = 0;
			cell.c++;
		}
	}
	*/

	// var Table = require('cli-table');
 
	// var table = new Table({
	//     head: ['TH 1 label', 'TH 2 label']
	//   , colWidths: [100, 200]
	// });
	 
	// table.push(
	//     ['First value', 'Second value']
	//   , ['First value', 'Second value']
	// );

	// console.log(table.toString());
	

	// var columnify = require('columnify');

	// watcher.signalList.filter(function(val){
	// 	delete val.mostMatchList;
	// });

	// console.log(columnify(watcher.signalList));

	// console.log(watcher);
	// repl.start().context.watcher = watcher;
	var user = {};
	
	user.name = askUser('what your name?');
	
	this.guess = function(){
		while (!found && inRange(cell, _ref)) {
			var cellRef = Excel.utils.encode_cell(cell);
			var celVal = worksheet[cellRef] ? worksheet[cellRef].v : '';

			var mostMatchObj = mostMatch(celVal, productList);
			mostMatchObj.cellRef = cellRef;
			
			watcher.detect(mostMatchObj);

			found = watcher.found();

			cell.r++;

			//reset cell-row && increase cell-col
			if (cell.r > _ref.e.r){
				cell.r = 0;
				cell.c++;
			}
		}
		return watcher;
	};

	repl.start(user.name + ':').context.productRange = this;

	return this;

};

ProductRange(worksheet, productList);