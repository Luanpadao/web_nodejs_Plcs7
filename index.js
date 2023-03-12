// /////////////////////////THIẾT LẬP KẾT NỐI WEB/////////////////////////
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
// Home calling
app.get("/", function(req, res){
    res.render("home")
});
//////////////////////CẤU HÌNH KẾT NỐI KEPWARE////////////////////
const {TagBuilder, IotGateway} = require('kepserverex-js');
const tagBuilder = new TagBuilder({ namespace: 'Channel1.Device1' });
const iotGateway = new IotGateway({
    host: '127.0.0.1',
    port: 5000
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
// Khai báo tag
var sw_mode 	= 'sw_mode';    //tag integer
var sw_im_ex 	= 'sw_im_ex';   //tag bool
var bt_run 		= 'bt_run';     //tag bool
var bt_reset    = 'bt_reset';   //tag bool
var bt_e_stop 	= 'bt_e_stop';  //tag bool
var bt_start 	= 'bt_start';   //tag bool
var bt_stop 	= 'bt_stop';    //tag bool
var bt_setup 	= 'bt_setup';   //tag bool
var speed_x     = 'speed_x';    //tag int
var speed_y     = 'speed_y';    //tag int
var speed_z     = 'speed_z';    //tag int
var pos_x 	    = 'pos_x';      //tag integer 
var pos_y 	    = 'pos_y';      //tag integer 
var pos_z 	    = 'pos_z';      //tag integer
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
var ss_i1       = 'ss_i1'       //tag_bool 
var ss_i2       = 'ss_i2'       //tag_bool 
var ss_o        = 'ss_o'        //tag_bool 
var dc_i        = 'dc_i'        //tag_bool 
var dc_o        = 'dc_o'        //tag_bool 
var qr_code     = 'qr_code'     //tag_string
 
// Đọc dữ liệu
const TagList = tagBuilder
.read(sw_mode) 
.read(sw_im_ex) 
.read(bt_run) 
.read(bt_reset)
.read(bt_e_stop)
.read(bt_start)
.read(bt_stop)
.read(bt_setup)
.read(speed_x)
.read(speed_y)
.read(speed_z)
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
.get();
// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag(){
    io.sockets.emit("sw_mode", tagArr[0]);  
    io.sockets.emit("sw_im_ex", tagArr[1]);
    io.sockets.emit("bt_run", tagArr[2]);
    io.sockets.emit("bt_reset", tagArr[3]);  
    io.sockets.emit("bt_e_stop", tagArr[4]);
    io.sockets.emit("bt_start", tagArr[5]);
    io.sockets.emit("bt_stop", tagArr[6]);  
    io.sockets.emit("bt_setup", tagArr[7]);
    io.sockets.emit("speed_x", tagArr[8]);
    io.sockets.emit("speed_y", tagArr[9]);
    io.sockets.emit("speed_z", tagArr[10]);
    io.sockets.emit("pos_x", tagArr[11]);
    io.sockets.emit("pos_y", tagArr[12]);
    io.sockets.emit("pos_z", tagArr[13]);
    io.sockets.emit("pos_1", tagArr[14]);
    io.sockets.emit("pos_2", tagArr[15]);
    io.sockets.emit("pos_3", tagArr[16]);
    io.sockets.emit("pos_4", tagArr[17]);
    io.sockets.emit("pos_5", tagArr[18]);
    io.sockets.emit("pos_6", tagArr[19]);
    io.sockets.emit("pos_7", tagArr[20]);
    io.sockets.emit("pos_8", tagArr[21]);
    io.sockets.emit("pos_9", tagArr[22]);
    io.sockets.emit("pos_10", tagArr[23]);
    io.sockets.emit("pos_11", tagArr[24]);
    io.sockets.emit("pos_12", tagArr[25]);
    io.sockets.emit("pos_13", tagArr[26]);
    io.sockets.emit("pos_14", tagArr[27]);
    io.sockets.emit("pos_15", tagArr[28]);
    io.sockets.emit("pos_16", tagArr[29]);
    io.sockets.emit("pos_17", tagArr[30]);
    io.sockets.emit("pos_18", tagArr[31]);
    io.sockets.emit("ss_i1", tagArr[32]);
    io.sockets.emit("ss_i2", tagArr[33]);
    io.sockets.emit("ss_o", tagArr[34]);
    io.sockets.emit("dc_i", tagArr[35]);
    io.sockets.emit("dc_o", tagArr[36]);
    io.sockets.emit("qr_code", tagArr[37]);
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
});