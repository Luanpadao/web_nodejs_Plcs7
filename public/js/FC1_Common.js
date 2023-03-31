var sw = 0;
var sw0 = false;
var sw1 = false;
var sw2 = 0;
var counter = [];
var temp = "";
var temp_1 = 0;
var QRCode_table = "";
var Name_table = "";
var Type_table = 0;
var Position_table = 0;
var pl_done = false;
var lock_1 = 0;
var lock_2 = 0;
$(document).ready(function(){
    $("#introduce").show();
    $("#control").hide();
    $("#member").hide();
    $("#intructor").hide();
    $("#mode_sa").show();
    $("#mode_a").hide();
    $(".bt_import").css("background-color", "blue");
    fn_IOFieldDataShow('pos_x','px',0);
    fn_IOFieldDataShow('pos_y','py',0);
    fn_IOFieldDataShow('pos_z','pz',0);
    fn_SymbolStatus('ss_i1','sstc','ss_i1');
    fn_SymbolStatus('ss_i2','sstc','ss_i2');
    fn_SymbolStatus('ss_o','sstc','ss_o');
    fn_SymbolStatus('dc_i','dc','dc_i');
    fn_SymbolStatus('dc_o','dc','dc_o');
    fn_SymbolStatus('n1','','pos_1');
    fn_SymbolStatus('n2','','pos_2');
    fn_SymbolStatus('n3','','pos_3');
    fn_SymbolStatus('n4','','pos_4');
    fn_SymbolStatus('n5','','pos_5');
    fn_SymbolStatus('n6','','pos_6');
    fn_SymbolStatus('n7','','pos_7');
    fn_SymbolStatus('n8','','pos_8');
    fn_SymbolStatus('n9','','pos_9');
    fn_SymbolStatus('n10','','pos_10');
    fn_SymbolStatus('n11','','pos_11');
    fn_SymbolStatus('n12','','pos_12');
    fn_SymbolStatus('n13','','pos_13');
    fn_SymbolStatus('n14','','pos_14');
    fn_SymbolStatus('n15','','pos_15');
    fn_SymbolStatus('n16','','pos_16');
    fn_SymbolStatus('n17','','pos_17');
    fn_SymbolStatus('n18','','pos_18');
    fn_IOFieldDataShow('qr_code','i1',0);
    fn_IOFieldDataShow('processed','',0);
    fn_IOFieldDataShow('counter','',0);            
    //////////////////////////////////////////////////////bt_introduce_chuyen trang
    $("#bt_introduce").click(function()
    {
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#intructor").hide();
        $("#banner").show();
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_intructor.classList.remove('active');
    });
    //////////////////////////////////////////////////////bt_tongquan_chuyen trang
    $("#bt_tongquan").click(function(){
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#intructor").hide();
        $("#banner").show();
        $("#content").css("background-color", "#fff");
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_intructor.classList.remove('active');
    });
    //////////////////////////////////////////////////////bt_mohinh_chuyentrang
    $("#bt_mohinh").click(function(){
        $("#introduce").show();
        $("#control").hide();
        $("#member").hide();
        $("#intructor").hide();
        $("#banner").show();
        $("#content").css("background-color", "#fff");
        bt_introduce.classList.add('active');
        bt_control.classList.remove('active');
        bt_member.classList.remove('active');
        bt_intructor.classList.remove('active');
    });
    //////////////////////////////////////////////////////bt_control_chuyen trang
    $("#bt_control").click(function()
    {
        $('#bt_introduce').removeClass('active');
        $('#bt_control').addClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_intructor').removeClass('active');
        $('#control').show();
        $('#scada').show();
        $("#table").hide();
        $('#introduce').hide();
    });
        //////////////////////////////////////////////////////bt_scada_chuyen trang
    $("#bt_scada").click(function(){
        $('#bt_introduce').removeClass('active');
        $('#bt_control').addClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_intructor').removeClass('active');
        $('#control').show();
        $('#scada').show();
        $("#table").hide();
        $('#introduce').hide();
    });
    //////////////////////////////////////////////////////bt_table_chuyen trang
    $("#bt_table").click(function(){
        $('#bt_introduce').removeClass('active');
        $('#bt_control').addClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_intructor').removeClass('active');
        $('#control').show();
        $('#scada').hide();
        $("#table").show();
        $('#introduce').hide();
    });
    //////////////////////////////////////////////////////bt_member_chuyen trang
    $("#bt_member").click(function()
    {
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').addClass('active');
        $('#bt_intructor').removeClass('active');
    });
    //////////////////////////////////////////////////////bt_intructor_chuyen trang
    $("#bt_intructor").click(function()
    {
        $('#bt_introduce').removeClass('active');
        $('#bt_control').removeClass('active');
        $('#bt_member').removeClass('active');
        $('#bt_intructor').addClass('active');
    });
    //////////////////////////////////////////////////////switch_Mode
    $("input[name='mode']").click(function(){
        sw = $(this).val();
        if(sw==0){
            $("#mode_sa").show();
            $("#mode_a").hide();
            mode.placeholder = "SEMI AUTO";
            socket.emit('cmd_sw_mode',0);
        }
        else if(sw==1){
            $("#mode_sa").hide();
            $("#mode_a").show();
            mode.placeholder = "AUTO";
            socket.emit('cmd_sw_mode',1);
        }
    });
    //////////////////////////////////////////////////////bt_import
    $(".bt_import").click(function()
    {
        $(".bt_import").css("background-color", "blue");
        $(".bt_export").css("background-color", "#6c757d");
        sw2 = 0;
        socket.emit('cmd_sw_im_ex', false);
    });
    //////////////////////////////////////////////////////bt_export
    $(".bt_export").click(function()
    {
        $(".bt_import").css("background-color", "#6c757d");
        $(".bt_export").css("background-color", "blue");
        sw2 = 1; 
        socket.emit('cmd_sw_im_ex', true);
    });
    //////////////////////////////////////////////////////bt_stop
    $(".bt_stop").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_stop', true);
    });
    $(".bt_stop").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_stop', false);
    });
    $(".bt_stop").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_stop', false);
    });
    //////////////////////////////////////////////////////bt_run
    $(".bt_run").mousedown(function()
    {
        if(sw == 0 & sw2 == 1)
        {
            document.getElementById('gd_dk_1').classList.add('d-none');
            document.getElementById('gd_dk_3').classList.remove('d-none');
        }
        else if(sw == 1 & sw2 == 1)
        {
            document.getElementById('gd_dk_1').classList.add('d-none');
            document.getElementById('gd_dk_4').classList.remove('d-none');
        }
        $(this).css("background-color","green");
        socket.emit('cmd_bt_run', true);
    });
    $(".bt_run").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_run', false);
    });
    $(".bt_run").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_run', false);
    });
    //////////////////////////////////////////////////////bt_e_stop
    $(".bt_e_stop").mousedown(function()
    {
        $(this).css("background-color","green");
        socket.emit('cmd_bt_e_stop', true);
    });
    $(".bt_e_stop").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_e_stop', false);
    });
    $(".bt_e_stop").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
        socket.emit('cmd_bt_e_stop', false);
    });
    $(".bt_e-stop").mouseup(function()
    {
        $(this).css("background-color","#6c757d");
    });
    $(".bt_e-stop").mouseout(function()
    {
        $(this).css("background-color","#6c757d");
    });
    //////////////////////////////////////////////////////bt_select
    $(".bt_select").click(function()
    {
        if(($('#pos').val() != "") & ($('#pos').val() > 0) & ($('#pos').val() < 19))
        {
            if ($('#n'+$('#pos').val()).hasClass('d-none'))
            {
                if(($('#i4').val() == "A" & $('#pos').val() <= 6) || ($('#i4').val() == "B" & $('#pos').val() <= 12 & $('#pos').val() > 6) || ($('#i4').val() == "C" & $('#pos').val() <= 18 & $('#pos').val() > 12))
                {
                    var pos = $('#pos').val();
                    $("#i3").val(pos);
                    socket.emit('cmd_pos', pos);
                    document.getElementById('gd_dk_1').classList.remove('d-none');
                    document.getElementById('gd_dk_2').classList.add('d-none');
                }
                else
                alert("Sai vị trí, vui lòng nhập lại!");
            }
            else
                alert("Ô kho đã có hàng, vui lòng nhập lại!");
        }
        else
            alert("Ô kho không tồn tại, vui lòng nhập lại!");
    });
});
////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer() {
    socket.emit("Client-send-data", "Request data client");
}
// Hàm hiển thị dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix){
    socket.on(tag,function(data){
        if(tag == 'qr_code')
            temp = data;
        else if(tag == 'counter')
        {
            counter[0] = parseInt(data[1]);
            counter[1] = parseInt(data[4]);
            counter[2] = parseInt(data[7]);
            document.getElementById("counter_1").innerHTML = counter[0];
            document.getElementById("counter_2").innerHTML = counter[1];
            document.getElementById("counter_3").innerHTML = counter[2];
            if(counter[0] == 6)
                $('#status_1').css("background-color","green");
            else
                $('#status_1').css("background-color","#fff");
            if(counter[1] == 6)
                $('#status_2').css("background-color","green");
            else
                $('#status_2').css("background-color","#fff");
            if(counter[2] == 6)
                $('#status_3').css("background-color","green");
            else
                $('#status_3').css("background-color","#fff");

        }
        else if(tag.substr(0,2) == "po")
        {
            temp = "";
            if(tofix == 0)
                document.getElementById(IOField).innerHTML = data;
            else
                document.getElementById(IOField).innerHTML = data.toFixed(tofix);
        }
        else if(tag == 'processed')
        {
            if(data == true & pl_done != data ){
                fn_Table01_SQL_Show();
                socket.emit('cmd_processed', false);
            }
            pl_done = data;
        }
        else
        {
            if(tofix == 0)
                document.getElementById(IOField).value = data * 5;
            else
                document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}
// Hàm chức năng hiển thị trạng thái symbol
function fn_SymbolStatus(ObjectID, SymName, Tag)
{
    if(ObjectID.substr(0,1) == "n")
    {
        socket.on(Tag, function(data){
            if (data == false)
                document.getElementById(ObjectID).classList.add('d-none');
            else if (data == true)
                document.getElementById(ObjectID).classList.remove('d-none');
        });
    }
    else
    {
        var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = false
        var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = true
        socket.on(Tag, function(data){
            if (data == false)
                document.getElementById(ObjectID).src = imglink_0;
            else if (data == true)
                document.getElementById(ObjectID).src = imglink_1;
        });
    }
}
// Yêu cầu dữ liệu bảng pre_data
function fn_Table01_SQL_Show(){
    socket.emit("msg_SQL_Show_01", "true");
    socket.on('SQL_Show_01',function(data){
        fn_table_01(data);
    }); 
}
// Hiển thị dữ liệu ra bảng pre_data
function fn_table_01(data){
    if(data){
        var len = data.length;
        if(len > 0){
            for(var i=0;i<len;i++){
                if((data[i].QRCode == temp) & $('#n'+(i+1)).hasClass('d-none') ){
                    $("#i1").val(data[i].QRCode);
                    $("#i2").val(data[i].Name);
                    $("#i4").val(data[i].Type);
                    if(sw == 0)
                    {
                        $('#pos').val("");
;                        $("#i3").val("");
                        document.getElementById('gd_dk_1').classList.add('d-none');
                        document.getElementById('gd_dk_2').classList.remove('d-none');
                    }
                    else if(sw == 1)
                        $("#i3").val(data[i].ID);
                    var tempArr=[];
                    tempArr[0] = data[i].ID;
                    tempArr[1] = data[i].QRCode;
                    tempArr[2] = data[i].Name;
                    tempArr[3] = data[i].Type;
                    if(sw2 == 1)
                        tempArr[4] = "Export";
                    else
                        tempArr[4] = "Import";
                    socket.emit("msg_send_data_SQL",tempArr);
                    break;
                }
            }
        }
    }   
}
