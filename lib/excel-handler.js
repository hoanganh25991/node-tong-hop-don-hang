var ExcelHanlder = function(){
	var XLSX = require('xlsx');
	var read = function(range){
		try{
			return XLSX.utils.decode_range(range);
		}catch(err){
			console.log('B4:B11, do you mis something');
			return err;
		}
		return
	};
};