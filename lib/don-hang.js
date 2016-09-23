var DonHang = function(donHangFolder){
	var fs = require('fs');

	var items = fs.readdirSync(donHangFolder);

	var listDonHang = items.filter(function(value){
		var p = /^~\$|^\.|^\../;
		return !p.test(value);
	});

	this.get = function(){
		return listDonHang;
	};
	return this;
};

module.exports = DonHang;