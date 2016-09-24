var Excel = require('xlsx');
var workbook = Excel.readFile('./excel-file/Đơn hàng HQ Food..xlsx');
var worksheet = workbook.Sheets[workbook.SheetNames[0]];

var ProductRange = require('./index-v3');

var productList = require('./lib/config').products;

var pr = ProductRange(worksheet, productList);

pr.guess();

var repl = require('repl');
repl.start().context.watcher = pr.watcher;