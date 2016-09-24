var X = require('xlsx');
X.utils.encode_cell('A1');
X.utils.decode_cell('A1');
var workbook = X.readFile('./excel-file/Đơn hàng 3 sạch 17_09_2016.xlsx');
workbook
workbook.Sheets['Sheet1'];
var a = workbook.Sheets['Sheet1'];
a['A1']
a['!ref'];
a['merges']
a['!merges']
a['A9']
a['D1']
X.utils.encode_range({ s: { c: 2, r: 6 }, e: { c: 6, r: 6 } });
