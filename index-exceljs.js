var Excel = require('exceljs');

var workbook = new Excel.Workbook();

workbook.creator = 'Anh Le Hoang';
workbook.lastModifiedBy = 'Anh Le Hoang';
workbook.created = new Date(1991, 9, 25);
workbook.modified = new Date();

var sheet = workbook.addWorksheet('don-hang');

workbook.xlsx
		.writeFile('tong-hop.xlsx')
		.then(function() {
			console.log('save to tong-hop');
		});
