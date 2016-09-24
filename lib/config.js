var config = {};

var askUser = require('readline-sync').question;

var rebuild = askUser('Do you want to rebuild product-list ? (yes/no, or just enter to skip)\n>');

var Excel = require('xlsx');

var fs = require('fs');

if (rebuild != '' && rebuild == 'yes'){
    var productBook = Excel.readFile(__dirname + '/product-list.xlsx');
    var productSheet = productBook.Sheets['Sheet1'];
    var _ref = Excel.utils.decode_range(productSheet['!ref']);
    var products = [];
    for(var i = 0; i <= _ref.e.r; i++){
        var cell = {c:0, r:i};
        var cellRef = Excel.utils.encode_cell(cell);
        var cellVal = productSheet[cellRef] ? productSheet[cellRef].v : '';
        products.push(cellVal);
    }
    config.products = products;

    fs.writeFile(__dirname + '/product-list.json', JSON.stringify(products), function(err){
        console.log('write product-list.json success');
    });
}else{
    var data = fs.readFileSync(__dirname + '/product-list.json');
    config.products = JSON.parse(data);
}

// config.products = [
//     'Xà Lách', 'Xà lách lolo tím', 'Xà lách lolo xanh', 'Xà lách Romaine',
//     'Xà lách Oakleaf xanh', 'Xà lách IceBerg', 'Xà lách Frise',
//     'Xà lách Mỡ', 'Cà Chua', 'Cà chua Đà Lạt', 'Cà chua Beef',
//     'Cà chua panama 250gr', 'Cà chua panama 500gr', 'Cà chua Doufu',
//     'Cà chua avatar 250 gr', 'Cà chua avatar 500 gr',
//     'Cà chua Picota 250gr', 'Cà chua Picota 500gr',
//     'Cà chua bi socola 250gr', 'Cà chua bi socola 500gr', 'Dưa Leo baby',
//     'Khoai Lang mật', 'Chuối Laba', 'Bí Đỏ hồ lô', 'Cải Thảo', 'Dâu Tây',
//     'Su Su', 'Hồng Khô', 'Chanh Dây', 'Lá trà xanh', 'Bó Xôi mini',
//     'Khoai Tây', 'Khoai tây vàng', 'Khoai tây hồng', 'Cà Rốt',
//     'Cà rốt mini', 'Cà rốt Đà Lạt', 'Củ Dền', 'Rau Gia Vị',
//     'Súp Lơ Xanh mini', 'Bắp Cải', 'Bắp cải trắng', 'Bắp cải trái tim',
//     'Bắp cải mini giống Nhật', 'Cải Thìa', 'Cải Cầu Vồng', 'Bông Atiso',
//     'Su hào', 'Ớt Chuông baby', 'Cam Canh', 'Hành ', 'Hành lá', 'Hành Paro',
//     'Sả', 'Chanh không hạt', 'Củ cải đỏ', 'Hành tây',
//     'Nấm Ngọc Thạch Đà Lạt', 'Bí Xanh non', 'Bí Ngòi Xanh', 'Gừng',
//     'Củ cải trắng'
// ];

var getPos = function(product){
    return config.products.indexOf(product);
};

// var trainList = [];

// config.products.forEach(function(val, index){
//     var row = {};
//     row.pos = indexl;
//     row.product = val;
//     trainList.push(row);
// });


var trainBook = Excel.readFile(__dirname + '/train.xlsx');

var trainSheet = trainBook.Sheets['Sheet1'];

var _ref = Excel.utils.decode_range(trainSheet['!ref']);

var trainList = [];

for(var i = _ref.s.r; i <= _ref.e.r; i++){
    var cell = {c:_ref.s.c, r:i};
    var cellRef = Excel.utils.encode_cell(cell);
    var cellVal = trainSheet[cellRef] ? trainSheet[cellRef].v : '';

    var next = {c:cell.c+1, r:cell.r};
    var nextRef = Excel.utils.encode_cell(next);
    var nextVal = trainSheet[nextRef] ? trainSheet[nextRef].v : '';

    var row = {};
    row.pos = getPos(cellVal);
    row.product = cellVal;
    row.similar = nextVal;
    trainList.push(row);
}

config.trainList = trainList;

// var trained = config.trainList.filter((val)=>{
//     return (val.similar == 'Xà Lách');
// });

// console.log(trained);
// 
// console.log(config);

module.exports = config;