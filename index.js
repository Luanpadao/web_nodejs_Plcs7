// /////////////////////////THIẾT LẬP KẾT NỐI WEB/////////////////////////
var express = require("express");
const session = require('express-session');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
// Home calling
app.get("/", function(req, res){
  // const ip_host_local = req.ip;
  res.render("home");
});
io.on('connection', (socket) => {
  socket.on('get_ip', () => {
      const ip = socket.handshake.address;
      socket.emit('ip', ip);
  });
});
//////////////////////////////////////////////////////////////////// chỉnh sửa
app.use(session({
  secret: 'mySecretKey', // chuỗi bí mật dùng để mã hóa session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // khi true, cookie chỉ được gửi qua HTTPS
}));
// Lấy IP để gán sang file home.ejs
// app.get("/ip",function(req,res){
//   const ip = req.ip;
//   console.log(`Địa chỉ IP của client là: ${ip}`);
//   res.send('Địa chỉ ip của bạn là: '+ip);
// });
//////////////////////CẤU HÌNH KẾT NỐI KEPWARE////////////////////
const {TagBuilder, IotGateway} = require('kepserverex-js');
const tagBuilder = new TagBuilder({ namespace: 'Channel1.Device1' });
const iotGateway = new IotGateway({
    host: '127.0.0.1',
    port: 5000
});
//////////////////////QUẢN LÝ CƠ SỞ DỮ LIỆU MYSQL////////////////////
// Khai báo SQL
var mysql = require('mysql');
var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "012321323Vn",
  database: "sql_plc",
  dateStrings:true
});
///////////////////////////QUÉT DỮ LIỆU////////////////////////
// Tạo Timer quét dữ liệu
setInterval(
	() => fn_read_data_scan(),
	1000 //100ms = 1s
);
 
// Quét dữ liệu
function fn_read_data_scan(){
	fn_tagRead();	// Đọc giá trị tag
  fn_sql_insert(); // Ghi dữ liệu vào SQL
}
// Ghi dữ liệu vào SQL
var sqlins_done = false; // Biến báo đã ghi xong dữ liệu
var QRCode_table;
var Name_table;
var Type_table;
var Position_table;
var ImportExport_table;
function fn_sql_insert(){
    var trigger = tagArr[39];  // Trigger đọc về từ PLC
    var sqltable_Name = "data";
    // Lấy thời gian hiện tại
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
    var temp_datenow = new Date();
    var timeNow = (new Date(temp_datenow - tzoffset)).toISOString().slice(0, -1).replace("T"," ");
    var timeNow_toSQL = "'" + timeNow + "',";
    // Ghi dữ liệu vào SQL
    if (trigger == true & trigger != sqlins_done)
    {
        var sqlins1 = "INSERT INTO " 
                    + sqltable_Name 
                    + " (date_time, QR_Code, Name, Type, Position, Import_Export) VALUES (";
        var sqlins2 = timeNow_toSQL 
                    + QRCode_table
                    + Name_table
                    + Type_table
                    + Position_table
                    + ImportExport_table
                    ;
        var sqlins = sqlins1 + sqlins2 + ");";
        // Thực hiện ghi dữ liệu vào SQL
        sqlcon.query(sqlins, function (err, result) {
            if (err) {
                console.log(err);
             } else {
                console.log("SQL - Ghi dữ liệu thành công");
              } 
            });
    }
    sqlins_done = trigger;
}
/////////////HÀM ĐỌC/GHI DỮ LIỆU XUỐNG KEPWARE(PLC)//////////////
//Đọc dữ liệu
var tagArr = [];
function fn_tagRead(){
	iotGateway.read(TagList).then((data)=>{
		var lodash = require('lodash');
		tagArr = lodash.map(data, (item) => item.v);
		console.log(tagArr);
	});
}
// Ghi dữ liệu
function fn_Data_Write(tag,data){
    tagBuilder.clean();	
    const set_value = tagBuilder
        .write(tag,data)
        .get();
    iotGateway.write(set_value);
}
///////////////////////////ĐỊNH NGHĨA TAG////////////////////////
// Mảng xuất dữ liệu Excel
var SQL_Excel = [];  // Dữ liệu Excel
// Khai báo tag
var sw_mode 	= 'sw_mode';    //tag integer
var sw_im_ex 	= 'sw_im_ex';   //tag bool
var bt_run 		= 'bt_run';     //tag bool
var bt_e_stop 	= 'bt_e_stop';  //tag bool
var bt_stop 	= 'bt_stop';    //tag bool
var bt_setup 	= 'bt_setup';   //tag bool
var pos_x 	    = 'pos_x';      //tag real
var pos_y 	    = 'pos_y';      //tag real
var pos_z 	    = 'pos_z';      //tag real
var pos_1 	    = 'pos_1';      //tag bool
var pos_2 	    = 'pos_2';      //tag bool 
var pos_3 	    = 'pos_3';      //tag bool
var pos_4 	    = 'pos_4';      //tag bool
var pos_5 	    = 'pos_5';      //tag bool 
var pos_6 	    = 'pos_6';      //tag bool 
var pos_7 	    = 'pos_7';      //tag bool
var pos_8 	    = 'pos_8';      //tag bool 
var pos_9 	    = 'pos_9';      //tag bool
var pos_10 	    = 'pos_10';     //tag bool
var pos_11	    = 'pos_11';     //tag bool
var pos_12 	    = 'pos_12';     //tag bool 
var pos_13 	    = 'pos_13';     //tag bool
var pos_14 	    = 'pos_14';     //tag bool
var pos_15 	    = 'pos_15';     //tag bool 
var pos_16 	    = 'pos_16';     //tag bool 
var pos_17 	    = 'pos_17';     //tag bool
var pos_18 	    = 'pos_18';     //tag bool
var ss_i1       = 'ss_i1';       //tag bool 
var ss_i2       = 'ss_i2';       //tag bool 
var ss_o        = 'ss_o';        //tag bool 
var dc_i        = 'dc_i';        //tag bool 
var dc_o        = 'dc_o';        //tag bool 
var qr_code     = 'qr_code';     //tag_string_10
var processed   = 'processed';   //tag bool 
var sql_insert_Trigger = 'sql_insert_Trigger'; //tag bool
var counter     = 'counter';         //tag array
var processed_1 = 'processed_1'; //tag bool
var send_pos         = 'send_pos'; //tag interger
var running     = 'running'; //tag bool
var finished    = 'finished'; //tag bool
var enable      = 'enable'; // tag bool
var err         = 'err'; // tag bool
var status_robot = 'status_robot'; // tag interger
var user = 'user'; // tag interger
var name = 'name'; // tag string
var ss_x = 'ss_x';              //tag_bool
var ss_y = 'ss_y';              //tag_bool
var ss_z = 'ss_z';              //tag_bool
var step_x = 'step_x';          //tag_bool
var step_y = 'step_y';          //tag_bool
var step_z = 'step_z';          //tag_bool
var qr_err = 'qr_err';          //tag_bool
var pos_enable = 'pos_enable'   //tag_bool
var type = 'type'               //tag char
// Đọc dữ liệu
const TagList = tagBuilder
.read(sw_mode) 
.read(sw_im_ex) 
.read(bt_run) 
.read(bt_e_stop)
.read(bt_stop)
.read(bt_setup)
.read(pos_x)
.read(pos_y)
.read(pos_z)
.read(pos_1)
.read(pos_2)
.read(pos_3)
.read(pos_4)
.read(pos_5)
.read(pos_6)
.read(pos_7)
.read(pos_8)
.read(pos_9)
.read(pos_10)
.read(pos_11)
.read(pos_12)
.read(pos_13)
.read(pos_14)
.read(pos_15)
.read(pos_16)
.read(pos_17)
.read(pos_18)
.read(ss_i1)
.read(ss_i2)
.read(ss_o)
.read(dc_i)
.read(dc_o)
.read(qr_code)
.read(processed)
.read(sql_insert_Trigger)
.read(counter)
.read(processed_1)
.read(send_pos) 
.read(running)
.read(finished)
.read(enable)
.read(err)
.read(status_robot)
.read(user)
.read(name)
.read(ss_x)
.read(ss_y)
.read(ss_z)
.read(step_x)
.read(step_y)
.read(step_z)
.read(qr_err)
.read(pos_enable)
.read(type)
.get();
// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag(){
    io.sockets.emit("sw_mode", tagArr[0]);  
    io.sockets.emit("sw_im_ex", tagArr[1]);
    io.sockets.emit("bt_run", tagArr[2]); 
    io.sockets.emit("bt_e_stop", tagArr[3]);
    io.sockets.emit("bt_stop", tagArr[4]);  
    io.sockets.emit("bt_setup", tagArr[5]);
    io.sockets.emit("pos_x", tagArr[6]);
    io.sockets.emit("pos_y", tagArr[7]);
    io.sockets.emit("pos_z", tagArr[8]);
    io.sockets.emit("pos_1", tagArr[9]);
    io.sockets.emit("pos_2", tagArr[10]);
    io.sockets.emit("pos_3", tagArr[11]);
    io.sockets.emit("pos_4", tagArr[12]);
    io.sockets.emit("pos_5", tagArr[13]);
    io.sockets.emit("pos_6", tagArr[14]);
    io.sockets.emit("pos_7", tagArr[15]);
    io.sockets.emit("pos_8", tagArr[16]);
    io.sockets.emit("pos_9", tagArr[17]);
    io.sockets.emit("pos_10", tagArr[18]);
    io.sockets.emit("pos_11", tagArr[19]);
    io.sockets.emit("pos_12", tagArr[20]);
    io.sockets.emit("pos_13", tagArr[21]);
    io.sockets.emit("pos_14", tagArr[22]);
    io.sockets.emit("pos_15", tagArr[23]);
    io.sockets.emit("pos_16", tagArr[24]);
    io.sockets.emit("pos_17", tagArr[25]);
    io.sockets.emit("pos_18", tagArr[26]);
    io.sockets.emit("ss_i1", tagArr[27]);
    io.sockets.emit("ss_i2", tagArr[28]);
    io.sockets.emit("ss_o", tagArr[29]);
    io.sockets.emit("dc_i", tagArr[30]);
    io.sockets.emit("dc_o", tagArr[31]);
    io.sockets.emit("qr_code", tagArr[32]);
    io.sockets.emit("processed", tagArr[33]);
    io.sockets.emit("sql_insert_Trigger", tagArr[34]);
    io.sockets.emit("counter", tagArr[35]);
    io.sockets.emit("processed_1", tagArr[36]);
    io.sockets.emit("send_pos", tagArr[37]);
    io.sockets.emit("running", tagArr[38]);
    io.sockets.emit("finished", tagArr[39]);
    io.sockets.emit("enable", tagArr[40]);
    io.sockets.emit("err", tagArr[41]);
    io.sockets.emit("status_robot", tagArr[42]);
    io.sockets.emit("user", tagArr[43]);
    io.sockets.emit("name", tagArr[44]);
    io.sockets.emit("ss_x",tagArr[45]);
    io.sockets.emit("ss_y",tagArr[46]);
    io.sockets.emit("ss_z",tagArr[47]);
    io.sockets.emit("step_x",tagArr[48]);
    io.sockets.emit("step_y",tagArr[49]);
    io.sockets.emit("step_z",tagArr[50]);
    io.sockets.emit("qr_err",tagArr[51]);
    io.sockets.emit("pos_enable",tagArr[52]);
    io.sockets.emit("type",tagArr[53]);
}
// ///////////GỬI DỮ LIỆU ĐẾN CLIENT (TRÌNH DUYỆT)///////////
io.on("connection", function(socket){
    socket.on("Client-send-data", function(data){
    fn_tag();
});});
// ///////////TRUYỀN NHẬN DỮ LIỆU VỚI TRÌNH DUYỆT WEB///////////////////
io.on("connection", function(socket){
  socket.on("cmd_sw_mode", function(data){
		fn_Data_Write(sw_mode,data);
	});
  socket.on("cmd_sw_im_ex", function(data){
		fn_Data_Write(sw_im_ex,data);
	});
  socket.on("cmd_bt_run", function(data){
		fn_Data_Write(bt_run,data);
	});
  socket.on("cmd_bt_stop", function(data){
		fn_Data_Write(bt_stop,data);
	});
  socket.on("cmd_bt_e_stop", function(data){
		fn_Data_Write(bt_e_stop,data);
	});
  socket.on("cmd_processed", function(data){
		fn_Data_Write(processed,data);
	});
  socket.on("cmd_qr_err",function(data){
    fn_Data_Write(qr_err,data);
  });
  socket.on("msg_SQL_Show", function(data)
  {
      // var sqltable_Name = "pre_data";
      var sqltable_Name = data;
      var query = "SELECT * FROM " + sqltable_Name + ";" 
      sqlcon.query(query, function(err, results, fields) {
          if (err) {
              console.log(err);
          } else {
              const objectifyRawPacket = row => ({...row});
              const convertedResponse = results.map(objectifyRawPacket);
              if(data == "pre_data")
                socket.emit('SQL_Show_pre_data', convertedResponse);
              else if (data == "data")
              {
                socket.emit('SQL_Show_data', convertedResponse);
                SQL_Excel = convertedResponse; // Xuất báo cáo Excel
              }
              else if (data == "user_data")
              {
                socket.emit('SQL_Show_user_data',convertedResponse);
              }
          } 
      });
  });
  socket.on("msg_send_data_SQL",function(data){
    QRCode_table = "'" + data[1] + "',";
    Name_table = "'" + data[2] + "',";
    Type_table = "'" + data[3] + "',";
    Position_table = "'" + data[0] + "',";
    ImportExport_table = "'" + data[4] + "'";
  });
  socket.on("cmd_pos",function(data){
    fn_Data_Write(send_pos,data);
  });
  socket.on("cmd_pos_enable",function(data){
    fn_Data_Write(pos_enable,data);
  });
  socket.on("cmd_name",function(data){
    fn_Data_Write(name,data);
  });
  socket.on("cmd_type",function(data){
    fn_Data_Write(type,data);
  });
  socket.on("msg_SQL_ByTime", function(data)
  {
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
      // Lấy thời gian tìm kiếm từ date time piker
      var timeS = new Date(data[0]); // Thời gian bắt đầu
      var timeE = new Date(data[1]); // Thời gian kết thúc
      // Quy đổi thời gian ra định dạng cua MySQL
      var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T"," ") + "'";
      var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T"," ") + "'";
      var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

      var sqltable_Name = "data"; // Tên bảng
      var dt_col_Name = "date_time";  // Tên cột thời gian

      var Query1 = "SELECT * FROM " + sqltable_Name + " WHERE "+ dt_col_Name + " BETWEEN ";
      var Query = Query1 + timeR + ";";
      
      sqlcon.query(Query, function(err, results, fields) {
          if (err) {
              console.log(err);
          } else {
              const objectifyRawPacket = row => ({...row});
              const convertedResponse = results.map(objectifyRawPacket);
              SQL_Excel = convertedResponse; // Xuất báo cáo Excel
              socket.emit('SQL_ByTime', convertedResponse);
          } 
      });
  });
  socket.on("msg_Excel_Report", function(data)
  {
      const [SaveAslink1, Bookname] = fn_excelExport();
      var data = [SaveAslink1, Bookname];
      socket.emit('send_Excel_Report', data);
  });
  socket.on("SQL_edit_data_user",function(data){
    var sqltable_Name = "user_data";
    var query = "UPDATE " + sqltable_Name + " set user = '" +data[6]
                                          +"', mssv ='" +data[1]
                                          +"', pass ='" +data[7]
                                          +"', name ='"+data[0]
                                          +"', Date_Of_Birth ='"+data[2]
                                          +"', sex ='"+data[3]
                                          +"', address ='"+data[4]
                                          +"', email ='"+data[5]
                                          +"', access ='"+data[8]
                                          +"' where stt='"+data[9]+"'"; 
    sqlcon.query(query, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log("SQL - Ghi dữ liệu thành công");
        } 
    });
  });
});
// /////////////////////////////// BÁO CÁO EXCEL ///////////////////////////////
const Excel = require('exceljs');
const { CONNREFUSED } = require('dns');
function fn_excelExport(){
  // =====================CÁC THUỘC TÍNH CHUNG=====================
      // Lấy ngày tháng hiện tại
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      let day = date_ob.getDay();
      var dayName = '';
      if(day == 0){dayName = 'Chủ nhật,'}
      else if(day == 1){dayName = 'Thứ hai,'}
      else if(day == 2){dayName = 'Thứ ba,'}
      else if(day == 3){dayName = 'Thứ tư,'}
      else if(day == 4){dayName = 'Thứ năm,'}
      else if(day == 5){dayName = 'Thứ sáu,'}
      else if(day == 6){dayName = 'Thứ bảy,'}
      else{};
  // Tạo và khai báo Excel
  let workbook = new Excel.Workbook()
  let worksheet =  workbook.addWorksheet('Báo cáo sản xuất', {
    pageSetup:{paperSize: 9, orientation:'landscape'},
    properties:{tabColor:{argb:'FFC0000'}},
  });
  // Page setup (cài đặt trang)
  worksheet.properties.defaultRowHeight = 20;
  worksheet.pageSetup.margins = {
    left: 0.3, right: 0.25,
    top: 0.75, bottom: 0.75,
    header: 0.3, footer: 0.3
  };
  // =====================THẾT KẾ HEADER=====================
  // Logo công ty
  const imageId1 = workbook.addImage({
      filename: 'public/images/Logo.png',
      extension: 'png',
    });
  worksheet.addImage(imageId1, 'A1:B4');
  // Thông tin công ty
  worksheet.getCell('C1').value = 'Trường Đại học Công nghiệp Thành phố Hồ Chí Minh';
  worksheet.getCell('C1').style = { font:{bold: true,size: 14},alignment: {vertical: 'middle'}} ;
  worksheet.getCell('C2').value = 'Địa chỉ: 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh';
  worksheet.getCell('C3').value = 'Điện thoại: (028) 38940390 Fax: (028) 38946268';
  worksheet.getCell('C4').value = 'Website: www.iuh.edu.vn';
  // Tên báo cáo
  worksheet.getCell('A6').value = 'BÁO CÁO SẢN XUẤT';
  worksheet.mergeCells('A6:H6');
  worksheet.getCell('A6').style = { font:{name: 'Times New Roman', bold: true,size: 16},alignment: {horizontal:'center',vertical: 'middle'}} ;
  // Ngày in biểu
  worksheet.getCell('H7').value = "Ngày in biểu: " + dayName + date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
  worksheet.getCell('H7').style = { font:{bold: false, italic: true},alignment: {horizontal:'right',vertical: 'bottom',wrapText: false}} ;
   
  // Tên nhãn các cột
  var rowpos = 8;
  var collumName = ["STT", "Ngày","Mã QR Code", "Tên sản phẩm", "Loại",  "Vị trí",  "Nhập/Xuất", "Ghi chú"]
  worksheet.spliceRows(rowpos, 1, collumName);
   
  // =====================XUẤT DỮ LIỆU EXCEL SQL=====================
  // Dump all the data into Excel
  var rowIndex = 0;
  SQL_Excel.forEach((e, index) => {
  // row 1 is the header.
  rowIndex =  index + rowpos;
  // worksheet1 collum
  worksheet.columns = [
        {key: 'STT'},
        {key: 'date_time'},
        {key: 'QR_Code'},
        {key: 'Name'},
        {key: 'Type'},
        {key: 'Position'},
        {key: 'Import_Export'},
      ]
  worksheet.addRow({
        STT: {
          formula: index + 1
        },
        ...e
      })
  })
  // Lấy tổng số hàng
  const totalNumberOfRows = worksheet.rowCount;
  // Tính tổng
  worksheet.addRow([
    'Tổng cộng:',
    {formula: `="Nhập : "& COUNTIF(G9:G${totalNumberOfRows},"Nhập") & " | Xuất : " &  COUNTIF(G9:G${totalNumberOfRows},"Xuất")`},
])
// Style cho hàng total (Tổng cộng)
worksheet.getCell(`A${totalNumberOfRows+1}`).style = { font:{bold: true,size: 12},alignment: {horizontal:'center',}} ;
worksheet.mergeCells(`B${totalNumberOfRows+1}`+':'+`H${totalNumberOfRows+1}`);
worksheet.getCell(`B${totalNumberOfRows+1}`).fill = {type: 'pattern',pattern:'solid',fgColor:{ argb:'f2ff00' }};
// Tô màu cho hàng total (Tổng cộng)
// const total_row = ['A','B', 'C', 'D', 'E','F','G','H']
// total_row.forEach((v) => {
//     worksheet.getCell(`${v}${totalNumberOfRows+1}`).fill = {type: 'pattern',pattern:'solid',fgColor:{ argb:'f2ff00' }}
// }) 

  // =====================STYLE CHO CÁC CỘT/HÀNG=====================
  // Style các cột nhãn
  const HeaderStyle = ['A','B', 'C', 'D', 'E','F','G','H']
  HeaderStyle.forEach((v) => {
      worksheet.getCell(`${v}${rowpos}`).style = { font:{bold: true},alignment: {horizontal:'center',vertical: 'middle',wrapText: true}} ;
      worksheet.getCell(`${v}${rowpos}`).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      }
  })
  // Cài đặt độ rộng cột
  worksheet.columns.forEach((column, index) => {
      column.width = 15;
  })
  // Set width header
  worksheet.getColumn(2).width = 20;
  worksheet.getColumn(8).width = 30;
   
  // ++++++++++++Style cho các hàng dữ liệu++++++++++++
  worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
    var datastartrow = rowpos;
    var rowindex = rowNumber + datastartrow;
    const rowlength = datastartrow + SQL_Excel.length
    if(rowindex >= rowlength+1){rowindex = rowlength+1}
    const insideColumns = ['A','B', 'C', 'D', 'E','F','G','H']
  // Tạo border
    insideColumns.forEach((v) => {
        // Border
      worksheet.getCell(`${v}${rowindex}`).border = {
        top: {style: 'thin'},
        bottom: {style: 'thin'},
        left: {style: 'thin'},
        right: {style: 'thin'}
      },
      // Alignment
      worksheet.getCell(`${v}${rowindex}`).alignment = {horizontal:'center',vertical: 'middle',wrapText: true}
    })
  })
   
   
  // =====================THẾT KẾ FOOTER=====================
  worksheet.getCell(`H${totalNumberOfRows+2}`).value = 'Ngày …………tháng ……………năm 20………';
  worksheet.getCell(`H${totalNumberOfRows+2}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'right',vertical: 'middle',wrapText: false}} ;
   
  worksheet.getCell(`B${totalNumberOfRows+3}`).value = 'Giám đốc';
  worksheet.getCell(`B${totalNumberOfRows+4}`).value = '(Ký, ghi rõ họ tên)';
  worksheet.getCell(`B${totalNumberOfRows+3}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'center',vertical: 'bottom',wrapText: false}} ;
  worksheet.getCell(`B${totalNumberOfRows+4}`).style = { font:{bold: false, italic: true},alignment: {horizontal:'center',vertical: 'top',wrapText: false}} ;
   
  worksheet.getCell(`E${totalNumberOfRows+3}`).value = 'Trưởng ca';
  worksheet.getCell(`E${totalNumberOfRows+4}`).value = '(Ký, ghi rõ họ tên)';
  worksheet.getCell(`E${totalNumberOfRows+3}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'center',vertical: 'bottom',wrapText: false}} ;
  worksheet.getCell(`E${totalNumberOfRows+4}`).style = { font:{bold: false, italic: true},alignment: {horizontal:'center',vertical: 'top',wrapText: false}} ;
   
  worksheet.getCell(`H${totalNumberOfRows+3}`).value = 'Người in biểu';
  worksheet.getCell(`H${totalNumberOfRows+4}`).value = '(Ký, ghi rõ họ tên)';
  worksheet.getCell(`H${totalNumberOfRows+3}`).style = { font:{bold: true, italic: false},alignment: {horizontal:'center',vertical: 'bottom',wrapText: false}} ;
  worksheet.getCell(`H${totalNumberOfRows+4}`).style = { font:{bold: false, italic: true},alignment: {horizontal:'center',vertical: 'top',wrapText: false}} ;
   
  // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
  // Export Link
  var currentTime = year + "_" + month + "_" + date + "_" + hours + "h" + minutes + "m" + seconds + "s";
  var saveasDirect = "Report/Report_" + currentTime + ".xlsx";
  SaveAslink = saveasDirect; // Send to client
  var booknameLink = "public/" + saveasDirect;
   
  var Bookname = "Report_" + currentTime + ".xlsx";
  // Write book name
  workbook.xlsx.writeFile(booknameLink)
   
  // Return
  return [SaveAslink, Bookname]
} // Đóng fn_excelExport
