var Excel = require('exceljs');

var file_TongHop = new Excel.Workbook();

file_TongHop.creator = 'Anh Le Hoang';
file_TongHop.lastModifiedBy = 'Anh Le Hoang';
file_TongHop.created = new Date(1991, 9, 25);
file_TongHop.modified = new Date();

var sheet = file_TongHop.addWorksheet('don-hang');

file_TongHop.xlsx
		.writeFile('tong-hop.xlsx')
		.then(function() {
			console.log('save to tong-hop');
		});


var donHang = new Excel.Workbook();

donHang.xlsx
		.readFile('./test/excel-file/Đơn hàng VFFM.xlsx')
		.then(function() {
		    console.log('read file success');
		});


