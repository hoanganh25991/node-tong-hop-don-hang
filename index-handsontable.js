// browserify index-handsontable.js -o bundle.js -r moment -r pikaday -r zeroclipboard -r numbro
var Handsontable = require('handsontable');

// var data = [
//   ["", "Ford", "Volvo", "Toyota", "Honda"],
//   ["2016", 10, 11, 12, 13],
//   ["2017", 20, 11, 14, 13],
//   ["2018", 30, 15, 12, 13]
// ];

var data = [
    {
      "CDF": "Ngành",
      "undefined": "Barcode mới",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "Category \r\nCode",
      "GIÁ KÊNH BÁN SỈ": "Category",
      "ÁP DỤNG: 15/07/2016": "Sản phẩm"
    },
    {
      "undefined": "ĐƠN VỊ TÍNH"
    },
    {
      "CDF": "Rau",
      "undefined": " 1121110000017 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Cải cầu vồng"
    },
    {
      "CDF": "Rau",
      "undefined": " 1121110000018 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": " Cải dĩa giống Nhật "
    },
    {
      "CDF": "Rau",
      "undefined": " 1121210000028 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Lá chè tươi"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000036 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách Batavia"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000037 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách Frise"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000038 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách Ice Berg"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000039 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách lô lô tím"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000040 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách lô lô xanh"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000041 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách Mỡ"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000042 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách Oak leaf tím"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000043 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách Oak leaf xanh"
    },
    {
      "CDF": "Rau",
      "undefined": " 1122110000044 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "2",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn lá",
      "ÁP DỤNG: 15/07/2016": "Xà lách Romaine"
    },
    {
      "CDF": "Rau",
      "undefined": " 1131910000062 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Cà chua bi avatar - 250gr"
    },
    {
      "CDF": "Rau",
      "undefined": " 1131910000063 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Cà chua bi avatar - 500gr"
    },
    {
      "CDF": "Rau",
      "undefined": " 1131910000066 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Cà chua bi socola  - 300gr"
    },
    {
      "CDF": "Rau",
      "undefined": " 1131910000067 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Cà chua bi socola  - 500gr"
    },
    {
      "CDF": "Rau",
      "undefined": " 1132010000071 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Cà chua Hà Lan ( Doufu)"
    },
    {
      "CDF": "Rau",
      "undefined": " 1131910000072 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Cà chua Picota  - 500gr"
    },
    {
      "CDF": "Rau",
      "undefined": " 1132010000073 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Cà chua Picota - 250gr"
    },
    {
      "CDF": "Rau",
      "undefined": " 1132110000075 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Cà rốt mini"
    },
    {
      "CDF": "Rau",
      "undefined": " 1132410000080 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Dưa leo baby"
    },
    {
      "CDF": "Rau",
      "undefined": " 1132710000089 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Khoai lang mật"
    },
    {
      "CDF": "Rau",
      "undefined": " 1133110000101 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Ớt chuông đỏ"
    },
    {
      "CDF": "Rau",
      "undefined": " 1133110000102 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Ớt chuông vàng"
    },
    {
      "CDF": "Rau",
      "undefined": " 1133110000103 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": "Ớt chuông xanh"
    },
    {
      "CDF": "Rau",
      "undefined": " 1133110000104 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "3",
      "GIÁ KÊNH BÁN SỈ": "Rau ăn thân củ quả",
      "ÁP DỤNG: 15/07/2016": " Ớt chuông baby "
    },
    {
      "CDF": "Rau",
      "undefined": " 1141310000116 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "4",
      "GIÁ KÊNH BÁN SỈ": "Trái cây",
      "ÁP DỤNG: 15/07/2016": "Chuối laba"
    },
    {
      "CDF": "Rau",
      "undefined": " 1141510000120 ",
      "BẢNG BARCODE THÀNH PHẨM - NGÀNH RAU": "4",
      "GIÁ KÊNH BÁN SỈ": "Trái cây",
      "ÁP DỤNG: 15/07/2016": "Mác mác"
    }
  ];

var container = document.getElementById('example');

var hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: true
});

